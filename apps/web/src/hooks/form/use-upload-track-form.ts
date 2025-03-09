import { useState } from 'react'

import { Form } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { generateCuid, TSuccess } from '@mizzo/utils'

import { MAX_SIZE_IN_BYTES } from '@/constants/index'
import { useUploadTrack } from '@/hooks/api/track'
import { useCreateUploadUrl } from '@/hooks/api/utils'
import { useFileUpload } from '@/hooks/custom/use-file-upload'
import { s3UploadFileViaPresignedUrl } from '@/lib/utils'

type TUploadedUrls = {
  posterUrl: string | null
  trackUrl: string | null
}

type TValidationResult = {
  error: boolean
  data: {
    title: string
    language: string
    tags?: string[]
    secondaryArtistIds?: string[]
    posterFileObj: File
    trackFileObj: File
    posterFileExt: string
    trackFileExt: string
  } | null
}

export type TUploadTrackFormValues = {
  title: string
  language: string
  tags?: string[]
  secondaryArtistIds?: string[]
  posterFile: UploadChangeParam
  trackFile: UploadChangeParam
}

export const useUploadTrackForm = () => {
  const trackId = generateCuid()
  const [form] = Form.useForm()
  const { data: session } = useSession()

  const [consent, setConsent] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isFilesUploading, setIsFilesUploading] = useState(false)
  const [successData, setSuccessData] =
    useState<TSuccess<{ id: string; title: string }>>()
  const [uploadedUrls, setUploadedUrls] = useState<TUploadedUrls>({
    posterUrl: null,
    trackUrl: null
  })

  const { mutateAsync: createUploadUrlMutate } = useCreateUploadUrl()
  const { mutate: uploadTrackMutation, isPending: isUploadTrackPending } =
    useUploadTrack()

  const resetUploadedUrls = () => {
    setUploadedUrls({ posterUrl: null, trackUrl: null })
  }

  const { preview: posterPreview, handleFileChange: handlePosterChange } =
    useFileUpload({
      fileType: 'Image',
      maxSize: MAX_SIZE_IN_BYTES.POSTER,
      onReset: resetUploadedUrls
    })

  const { preview: trackPreview, handleFileChange: handleTrackChange } =
    useFileUpload({
      fileType: 'Track',
      maxSize: MAX_SIZE_IN_BYTES.TRACK,
      onReset: resetUploadedUrls
    })

  const validateFormData = (
    values: TUploadTrackFormValues
  ): TValidationResult => {
    const { title, language, posterFile, trackFile, tags, secondaryArtistIds } =
      values

    if (!consent) {
      toast.error('Consent is required')
      return { error: true, data: null }
    }

    if (!duration) {
      toast.error('Track not uploaded properly')
      return { error: true, data: null }
    }

    if (session?.user && secondaryArtistIds?.includes(session.user.id)) {
      toast.error('You cannot add yourself as a secondary artist')
      return { error: true, data: null }
    }

    const posterFileObj = posterFile?.fileList?.[0]?.originFileObj
    const posterFileExt = posterFileObj?.name.split('.').pop()

    const trackFileObj = trackFile?.fileList?.[0]?.originFileObj
    const trackFileExt = trackFileObj?.name.split('.').pop()

    if (!title || !language || !posterFileObj || !trackFileObj) {
      toast.error('Please fill all required fields')
      return { error: true, data: null }
    }

    if (!posterFileExt || !trackFileExt) {
      toast.error('Please upload a valid poster and track file')
      return { error: true, data: null }
    }

    return {
      error: false,
      data: {
        title,
        language,
        tags,
        secondaryArtistIds,
        posterFileObj,
        trackFileObj,
        posterFileExt,
        trackFileExt
      }
    }
  }

  const handleTrackUpload = async (values: TUploadTrackFormValues) => {
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
      trackFileObj,
      posterFileExt,
      trackFileExt
    } = validationResult.data!

    let finalPosterUrl = uploadedUrls.posterUrl
    let finalTrackUrl = uploadedUrls.trackUrl

    if (!finalPosterUrl || !finalTrackUrl) {
      try {
        setIsFilesUploading(true)

        const [posterPresignedUrl, trackPresignedUrl] = await Promise.all([
          createUploadUrlMutate({
            directory: 'track-poster',
            fileName: `${trackId}.${posterFileExt}`,
            fileSize: posterFileObj.size,
            fileType: posterFileObj.type
          }),
          createUploadUrlMutate({
            directory: 'raw-track',
            fileName: `${trackId}.${trackFileExt}`,
            fileSize: trackFileObj.size,
            fileType: trackFileObj.type
          })
        ])

        if (
          !posterPresignedUrl.data?.uploadUrl ||
          !trackPresignedUrl.data?.uploadUrl
        ) {
          throw new Error('Failed to get upload URLs')
        }

        ;[finalPosterUrl, finalTrackUrl] = await Promise.all([
          s3UploadFileViaPresignedUrl(
            posterFileObj,
            posterPresignedUrl.data.uploadUrl
          ),
          s3UploadFileViaPresignedUrl(
            trackFileObj,
            trackPresignedUrl.data.uploadUrl
          )
        ])

        setUploadedUrls({
          posterUrl: finalPosterUrl,
          trackUrl: finalTrackUrl
        })
      } catch (error) {
        console.error('Error in file upload:', error)
        toast.error('Failed to upload files')
        return
      } finally {
        setIsFilesUploading(false)
      }
    }

    uploadTrackMutation(
      {
        id: trackId,
        title,
        language,
        tags,
        secondaryArtistIds,
        duration: Number(duration),
        posterUrl: finalPosterUrl,
        trackUrl: finalTrackUrl
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: (success) => {
          resetUploadedUrls()
          setSuccessData(success)
          toast.success(success.message)
        }
      }
    )
  }

  return {
    form,
    consent,
    duration,
    successData,
    trackPreview,
    posterPreview,
    isSubmitting: isFilesUploading || isUploadTrackPending,
    setConsent,
    setDuration,
    handleTrackUpload,
    handleTrackChange,
    handlePosterChange
  }
}
