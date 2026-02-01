import { useState } from 'react'

import { Form } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { MAX_SIZE_IN_BYTES } from '@/constants/index'
import { useUpdateTrack } from '@/hooks/api/track'
import { useCreateUploadUrl } from '@/hooks/api/utils'
import { useFileUpload } from '@/hooks/custom/use-file-upload'
import { getLanguageList, s3UploadFileViaPresignedUrl } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { Track } from '@/types/track'

type TUploadedUrls = {
  posterUrl: string | null
}

type TValidationResult = {
  error: boolean
  data: {
    title: string
    language: string
    tags?: string[]
    secondaryArtistIds?: string[]
    posterFile: UploadChangeParam
    posterFileObj?: File
    posterFileExt?: string
  } | null
}

type TTrackUpdateFormValues = {
  title: string
  language: string
  tags?: string[]
  secondaryArtistIds?: string[]
  posterFile: UploadChangeParam
}

export const useUpdateTrackForm = (track: Track, close: () => void) => {
  const [form] = Form.useForm()
  const languageList = getLanguageList()
  const { data: session } = useSession()

  const [isFilesUploading, setIsFilesUploading] = useState(false)
  const [posterUpdateOption, setPosterUpdateOption] =
    useState<TMediaUpdateOption>('NO_CHANGE')
  const [isPublic, setIsPublic] = useState(track.isPublic || false)
  const [uploadedUrls, setUploadedUrls] = useState<TUploadedUrls>({
    posterUrl: null
  })

  const { mutateAsync: createUploadUrlMutate } = useCreateUploadUrl()
  const { mutate: updateTrackMutate, isPending: updateTrackPending } =
    useUpdateTrack({
      onSuccess: (success) => {
        invalidateQueries({
          queryKey: ['useSearchTrackByTrackId', { search: track.id }]
        })
        close()
        toast.success(success.message)
      },
      onError: (error) => toast.error(error.message)
    })

  const resetUploadedUrls = () => {
    setUploadedUrls({ posterUrl: null })
  }

  const { handleFileChange: handlePosterChange } = useFileUpload({
    maxSize: MAX_SIZE_IN_BYTES.POSTER,
    fileType: 'Image',
    onReset: resetUploadedUrls
  })

  const validateFormData = (
    values: TTrackUpdateFormValues
  ): TValidationResult => {
    const { title, language, tags, secondaryArtistIds, posterFile } = values

    const posterFileObj = posterFile?.fileList?.[0]?.originFileObj
    const posterFileExt = posterFileObj?.name.split('.').pop()

    if (!title) {
      toast.error('Please enter track title')
      return { error: true, data: null }
    }

    if (!language) {
      toast.error('Please select track language')
      return { error: true, data: null }
    }

    if (posterUpdateOption === 'UPDATE' && (!posterFileObj || !posterFileExt)) {
      toast.error('Please upload a valid image file')
      return { error: true, data: null }
    }

    if (session?.user && secondaryArtistIds?.includes(session.user.id)) {
      toast.error('You cannot add yourself as a secondary artist')
      return { error: true, data: null }
    }

    return {
      error: false,
      data: {
        title,
        language,
        tags,
        secondaryArtistIds,
        posterFile,
        posterFileObj: posterFileObj || undefined,
        posterFileExt: posterFileExt || undefined
      }
    }
  }

  const handleTrackUpdate = async (values: TTrackUpdateFormValues) => {
    const validationResult = validateFormData(values)

    if (validationResult.error) {
      return
    }

    const {
      title,
      language,
      tags,
      secondaryArtistIds,
      posterFileObj,
      posterFileExt
    } = validationResult.data!

    let finalPosterUrl = uploadedUrls.posterUrl

    if (posterUpdateOption === 'UPDATE') {
      try {
        setIsFilesUploading(true)

        const { data: presignedUrlData } = await createUploadUrlMutate({
          directory: 'track-poster',
          fileName: `${track.id}.${posterFileExt}`,
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

    updateTrackMutate({
      trackId: track.id,
      title,
      language,
      tags,
      isPublic,
      secondaryArtistIds,
      posterUpdateOption,
      posterUrl: finalPosterUrl ?? undefined
    })
  }

  return {
    form,
    languageList,
    isPublic,
    posterUpdateOption,
    isSubmitting: isFilesUploading || updateTrackPending,
    setIsPublic,
    setPosterUpdateOption,
    handlePosterChange,
    handleTrackUpdate
  }
}
