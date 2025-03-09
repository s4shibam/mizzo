import { useState } from 'react'

import type { UploadFile } from 'antd'
import { toast } from 'react-hot-toast'

import { formatBytes } from '@/lib/utils'

type UseFileUploadProps = {
  fileType: string
  maxSize: number
  onReset?: () => void
}

export const useFileUpload = ({
  fileType,
  maxSize,
  onReset
}: UseFileUploadProps) => {
  const [preview, setPreview] = useState<string>()

  const resetPreview = () => {
    setPreview(undefined)
    onReset?.()
  }

  const handleFileChange = (fileList: UploadFile[]) => {
    const file = fileList[0]?.originFileObj

    console.log(fileList[0])

    if (!file) {
      resetPreview()
      return
    }

    if (file.size > maxSize) {
      toast.error(
        `${fileType} size cannot be more than ${formatBytes(maxSize, 'MB')}`
      )
      resetPreview()
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    onReset?.()
  }

  return {
    preview,
    setPreview,
    resetPreview,
    handleFileChange
  }
}
