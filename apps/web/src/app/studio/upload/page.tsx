'use client'

import { useEffect } from 'react'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { UploadTrackForm } from '@/components/forms/upload-track'

const UploadPage = () => {
  useEffect(() => {
    document.title = `Upload - ${APP_SLUG_CAP}`
  }, [])

  return (
    <div className="mx-auto w-full max-w-4xl py-4">
      <h1 className="text-primary text-center text-3xl font-semibold">
        Upload Track
      </h1>

      <p className="mb-10 text-center text-lg">
        Share your music with the world! Fill in the details below.
      </p>

      <UploadTrackForm />
    </div>
  )
}

export default UploadPage
