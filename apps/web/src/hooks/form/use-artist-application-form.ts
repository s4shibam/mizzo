import { useState } from 'react'

import { Form } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { MAX_SIZE_IN_BYTES } from '@/constants/index'
import { useSubmitArtistApplication } from '@/hooks/api/user'
import { useCreateUploadUrl } from '@/hooks/api/utils'
import { useFileUpload } from '@/hooks/custom/use-file-upload'
import { s3UploadFileViaPresignedUrl } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'

type TUploadedUrls = {
  idProofUrl: string | null
}

type TValidationResult = {
  error: boolean
  data: {
    idProofType: string
    message: string
    idProofFile: UploadChangeParam
    idProofFileObj: File
    idProofFileExt: string
  } | null
}

export type TArtistApplicationFormValues = {
  idProofType: string
  message: string
  idProofFile: UploadChangeParam
}

export const useArtistApplicationForm = () => {
  const { data: session, update } = useSession()
  const [form] = Form.useForm()

  const [isFilesUploading, setIsFilesUploading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<TUploadedUrls>({
    idProofUrl: null
  })

  const { mutateAsync: createUploadUrlMutate } = useCreateUploadUrl()
  const {
    mutate: submitArtistApplicationMutation,
    isPending: isSubmitArtistApplicationPending
  } = useSubmitArtistApplication()

  const resetUploadedUrls = () => {
    setUploadedUrls({
      idProofUrl: null
    })
  }

  const { preview: idProofPreview, handleFileChange: handleIdProofChange } =
    useFileUpload({
      maxSize: MAX_SIZE_IN_BYTES.IMAGE,
      fileType: 'Image',
      onReset: resetUploadedUrls
    })

  const validateFormData = (
    values: TArtistApplicationFormValues
  ): TValidationResult => {
    const { idProofType, message, idProofFile } = values

    const idProofFileObj = idProofFile?.fileList?.[0]?.originFileObj
    const idProofFileExt = idProofFileObj?.name.split('.').pop()

    if (!idProofType || !message || !idProofFileObj) {
      toast.error('Please fill all required fields')
      return { error: true, data: null }
    }

    if (!idProofFileExt) {
      toast.error('Invalid file format')
      return { error: true, data: null }
    }

    return {
      error: false,
      data: {
        idProofType,
        message,
        idProofFile,
        idProofFileObj,
        idProofFileExt
      }
    }
  }

  const handleArtistApplicationSubmit = async (
    values: TArtistApplicationFormValues
  ) => {
    const validationResult = validateFormData(values)

    if (validationResult.error) {
      return
    }

    const { idProofType, message, idProofFileObj, idProofFileExt } =
      validationResult.data!

    let finalIdProofUrl = uploadedUrls.idProofUrl

    if (!finalIdProofUrl) {
      try {
        setIsFilesUploading(true)

        const [idProofPresignedUrl] = await Promise.all([
          createUploadUrlMutate({
            directory: 'user-data',
            fileName: `${session?.user?.id}/id-proof.${idProofFileExt}`,
            fileSize: idProofFileObj.size,
            fileType: idProofFileObj.type
          })
        ])

        if (!idProofPresignedUrl.data?.uploadUrl) {
          throw new Error('Failed to get upload URLs')
        }

        finalIdProofUrl = await s3UploadFileViaPresignedUrl(
          idProofFileObj,
          idProofPresignedUrl.data.uploadUrl
        )

        setUploadedUrls({
          idProofUrl: finalIdProofUrl
        })
      } catch (error) {
        console.error('Error in file upload:', error)
        toast.error('Failed to upload files')
        return
      } finally {
        setIsFilesUploading(false)
      }
    }

    submitArtistApplicationMutation(
      {
        message,
        idProofType,
        idProofUrl: finalIdProofUrl
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: (success) => {
          resetUploadedUrls()
          invalidateQueries({ queryKey: ['useGetArtistApplicationStatus'] })
          update({ ...success?.data })
          toast.success(success.message)
        }
      }
    )
  }

  return {
    form,
    idProofPreview,
    isFormSubmitting: isFilesUploading || isSubmitArtistApplicationPending,
    handleIdProofChange,
    handleArtistApplicationSubmit
  }
}
