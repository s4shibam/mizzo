import { useState } from 'react'

import { Form } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { MAX_SIZE_IN_BYTES } from '@/constants/index'
import { useUpdateProfile } from '@/hooks/api/user'
import { useCreateUploadUrl } from '@/hooks/api/utils'
import { useFileUpload } from '@/hooks/custom/use-file-upload'
import { s3UploadFileViaPresignedUrl } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'

type TUploadedUrls = {
  avatarUrl: string | null
}

type TValidationResult = {
  error: boolean
  data: {
    name: string
    bio?: string
    facebook?: string
    twitter?: string
    instagram?: string
    avatarFile: UploadChangeParam
    avatarFileObj?: File
    avatarFileExt?: string
  } | null
}

type TProfileUpdateFormValues = {
  name: string
  bio?: string
  facebook?: string
  twitter?: string
  instagram?: string
  avatarFile: UploadChangeParam
}

export const useUpdateProfileForm = (close: () => void) => {
  const { data: session, update } = useSession()
  const [form] = Form.useForm()

  const [isFilesUploading, setIsFilesUploading] = useState(false)
  const [avatarUpdateOption, setAvatarUpdateOption] =
    useState<TMediaUpdateOption>('NO_CHANGE')
  const [uploadedUrls, setUploadedUrls] = useState<TUploadedUrls>({
    avatarUrl: null
  })

  const { mutateAsync: createUploadUrlMutate } = useCreateUploadUrl()
  const { mutate: updateProfileMutate, isPending: updateProfilePending } =
    useUpdateProfile()

  const resetUploadedUrls = () => {
    setUploadedUrls({ avatarUrl: null })
  }

  const { handleFileChange: handleAvatarChange } = useFileUpload({
    maxSize: MAX_SIZE_IN_BYTES.PROFILE_IMAGE,
    fileType: 'Image',
    onReset: resetUploadedUrls
  })

  const validateFormData = (
    values: TProfileUpdateFormValues
  ): TValidationResult => {
    const { name, bio, facebook, twitter, instagram, avatarFile } = values
    const avatarFileObj = avatarFile?.fileList?.[0]?.originFileObj
    const avatarFileExt = avatarFileObj?.name.split('.').pop()

    if (!name) {
      toast.error('Please enter your name')
      return { error: true, data: null }
    }

    if (avatarUpdateOption === 'UPDATE' && (!avatarFileObj || !avatarFileExt)) {
      toast.error('Please upload a valid image file')
      return { error: true, data: null }
    }

    return {
      error: false,
      data: {
        name,
        bio,
        facebook,
        twitter,
        instagram,
        avatarFile,
        avatarFileObj: avatarFileObj || undefined,
        avatarFileExt: avatarFileExt || undefined
      }
    }
  }

  const handleProfileUpdate = async (values: TProfileUpdateFormValues) => {
    const validationResult = validateFormData(values)

    if (validationResult.error) {
      return
    }

    const { name, bio, facebook, twitter, instagram, avatarFileObj, avatarFileExt } =
      validationResult.data!
    let finalAvatarUrl = uploadedUrls.avatarUrl

    if (avatarUpdateOption === 'UPDATE') {
      try {
        setIsFilesUploading(true)

        const { data: presignedUrlData } = await createUploadUrlMutate({
          directory: 'user-data',
          fileName: `${session?.user?.id}/avatar.${avatarFileExt}`,
          fileSize: avatarFileObj!.size,
          fileType: avatarFileObj!.type
        })

        if (!presignedUrlData?.uploadUrl) {
          throw new Error('Failed to get upload URL')
        }

        finalAvatarUrl = await s3UploadFileViaPresignedUrl(
          avatarFileObj!,
          presignedUrlData.uploadUrl
        )

        setUploadedUrls({ avatarUrl: finalAvatarUrl })
      } catch (error) {
        console.error('Error in file upload:', error)
        toast.error('Failed to upload image')
        return
      } finally {
        setIsFilesUploading(false)
      }
    }

    updateProfileMutate(
      {
        name,
        bio,
        facebook,
        twitter,
        instagram,
        avatarUpdateOption,
        avatarUrl: finalAvatarUrl ?? undefined
      },
      {
        onSuccess: (success) => {
          resetUploadedUrls()
          invalidateQueries({ queryKey: ['useGetMyProfile'] })
          toast.success(success?.message)
          update({ ...success.data })
          close()
        },
        onError: (error) => toast.error(error?.message)
      }
    )
  }

  return {
    form,
    avatarUpdateOption,
    isSubmitting: isFilesUploading || updateProfilePending,
    setAvatarUpdateOption,
    handleAvatarChange,
    handleProfileUpdate
  }
}
