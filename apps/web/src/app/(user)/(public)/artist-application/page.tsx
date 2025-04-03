'use client'

import { Alert, Tag } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Loader } from '@/components/common/loader'
import { SubmitArtistApplicationForm } from '@/components/forms/submit-artist-application'
import { useGetArtistApplicationStatus } from '@/hooks/api/user'
import { getFormattedDate } from '@/lib/dayjs'

const ArtistApplicationPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const {
    data: application,
    isLoading: isApplicationLoading,
    error: applicationError
  } = useGetArtistApplicationStatus()

  if (status === 'loading' || isApplicationLoading) {
    return <Loader loading />
  }

  if (status === 'unauthenticated') {
    router.replace('/auth/login')
    return null
  }

  if (isApplicationLoading) {
    return <Loader loading />
  }

  if (applicationError?.statusCode === 404) {
    return (
      <div className="mx-auto w-full max-w-4xl py-4">
        <h1 className="text-primary mb-2 text-center text-3xl font-semibold">
          Artist Application
        </h1>

        <p className="mb-10 text-center text-lg">
          Please fill out the form below to apply to become an artist.
        </p>

        <SubmitArtistApplicationForm />
      </div>
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-8">
      <h1 className="text-primary text-center text-3xl font-semibold">
        Application Status
      </h1>

      <Alert
        message={
          <p className="py-2 text-center text-lg">
            Your application has been submitted and is{' '}
            {application?.data?.isApproved ? 'approved' : 'under review'}.
          </p>
        }
        type="success"
      />

      <div className="space-y-4 rounded-lg border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Application ID</span>

          <span className="text-primary font-medium">
            AA-ID-0{application?.data?.id}
          </span>
        </div>

        {application?.data?.message && (
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500">Message</span>

            <span className="font-medium">{application?.data?.message}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Submitted On</span>

          <span className="font-medium">
            {getFormattedDate(application?.data?.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Status</span>

          <Tag
            className="mr-0"
            color={application?.data?.isApproved ? 'lime' : 'orange'}
          >
            {application?.data?.isApproved ? 'Approved' : 'Under Review'}
          </Tag>
        </div>

        {application?.data?.isApproved && (
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Approved On</span>

            <span className="font-medium">
              {getFormattedDate(application?.data?.updatedAt)}
            </span>
          </div>
        )}
      </div>

      {application?.data?.isApproved && (
        <Alert
          message={
            <p className="py-2 text-center">
              To access artist features, you may need to log out and log back in
              to refresh your session.
            </p>
          }
          type="info"
        />
      )}
    </div>
  )
}

export default ArtistApplicationPage
