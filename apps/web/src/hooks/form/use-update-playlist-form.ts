import { useState } from 'react'

import { Form } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import { toast } from 'react-hot-toast'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { MAX_SIZE_IN_BYTES } from '@/constants/index'
import { useUpdatePlaylist } from '@/hooks/api/playlist'
import { useCreateUploadUrl } from '@/hooks/api/utils'
import { useFileUpload } from '@/hooks/custom/use-file-upload'
import { s3UploadFileViaPresignedUrl } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { Playlist } from '@/types/playlist'

type TUploadedUrls = {
  posterUrl: string | null
}

type TValidationResult = {
  error: boolean
  data: {
    name: string
    description?: string
    posterFile: UploadChangeParam
    posterFileObj?: File
    posterFileExt?: string
  } | null
}

type TPlaylistUpdateFormValues = {
  name: string
  description?: string
  posterFile: UploadChangeParam
}

export const useUpdatePlaylistForm = (
  playlist: Playlist,
  onSuccess: () => void
) => {
  const [form] = Form.useForm()

  const [isPublic, setIsPublic] = useState(playlist.isPublic ?? false)
  const [isFilesUploading, setIsFilesUploading] = useState(false)
  const [posterUpdateOption, setPosterUpdateOption] =
    useState<TMediaUpdateOption>('NO_CHANGE')
  const [uploadedUrls, setUploadedUrls] = useState<TUploadedUrls>({
    posterUrl: null
  })

  const { mutateAsync: createUploadUrlMutate } = useCreateUploadUrl()
  const { mutate: updatePlaylistMutate, isPending: updatePlaylistPending } =
    useUpdatePlaylist()

  const resetUploadedUrls = () => {
    setUploadedUrls({ posterUrl: null })
  }

  const { preview: posterPreview, handleFileChange: handlePosterChange } =
    useFileUpload({
      maxSize: MAX_SIZE_IN_BYTES.POSTER,
      fileType: 'Image',
      onReset: resetUploadedUrls
    })

  const validateFormData = (
    values: TPlaylistUpdateFormValues
  ): TValidationResult => {
    const { name, description, posterFile } = values
    const posterFileObj = posterFile?.fileList?.[0]?.originFileObj
    const posterFileExt = posterFileObj?.name.split('.').pop()

    if (!name) {
      toast.error('Please enter a playlist name')
      return { error: true, data: null }
    }

    if (posterUpdateOption === 'UPDATE' && (!posterFileObj || !posterFileExt)) {
      toast.error('Please upload a valid poster image')
      return { error: true, data: null }
    }

    return {
      error: false,
      data: {
        name,
        description,
        posterFile,
        posterFileObj: posterFileObj || undefined,
        posterFileExt: posterFileExt || undefined
      }
    }
  }

  const handlePlaylistUpdate = async (values: TPlaylistUpdateFormValues) => {
    const validationResult = validateFormData(values)

    if (validationResult.error) {
      return
    }

    const { name, description, posterFileObj, posterFileExt } =
      validationResult.data!
    let finalPosterUrl = uploadedUrls.posterUrl

    if (posterUpdateOption === 'UPDATE') {
      try {
        setIsFilesUploading(true)

        const { data: presignedUrlData } = await createUploadUrlMutate({
          directory: 'playlist-poster',
          fileName: `${playlist.id}.${posterFileExt}`,
          fileSize: posterFileObj!.size,
          fileType: posterFileObj!.type
        })

        if (!presignedUrlData?.uploadUrl) {
          throw new Error('Failed to get upload URL')
        }

        finalPosterUrl = await s3UploadFileViaPresignedUrl(
          posterFileObj!,
          presignedUrlData.uploadUrl
        )

        setUploadedUrls({ posterUrl: finalPosterUrl })
      } catch (error) {
        console.error('Error in file upload:', error)
        toast.error('Failed to upload image')
        return
      } finally {
        setIsFilesUploading(false)
      }
    }

    updatePlaylistMutate(
      {
        playlistId: playlist.id,
        name,
        description,
        isPublic,
        posterUpdateOption,
        posterUrl: finalPosterUrl ?? undefined
      },
      {
        onError: (error) => toast.error(error?.message),
        onSuccess: (success) => {
          onSuccess()
          resetUploadedUrls()
          toast.success(success?.message)
          invalidateQueries({
            queryKey: ['useSearchPlaylistByPlaylistId', { search: playlist.id }]
          })
        }
      }
    )
  }

  return {
    form,
    isPublic,
    posterPreview,
    posterUpdateOption,
    isSubmitting: isFilesUploading || updatePlaylistPending,
    setIsPublic,
    setPosterUpdateOption,
    handlePosterChange,
    handlePlaylistUpdate
  }
}
