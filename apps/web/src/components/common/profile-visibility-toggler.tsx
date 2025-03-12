'use client'

import { Switch, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { LuInfo } from 'react-icons/lu'

import { useTogglePublicViewOfProfile } from '@/hooks/api/user'

export const ProfileVisibilityToggler = () => {
  const { data: session, update } = useSession()

  const { mutate: togglePublicViewOfProfileMutation } =
    useTogglePublicViewOfProfile({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        update({ isPublicProfile: success?.data?.isPublicProfile })
        toast.success(success?.message)
      }
    })

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-black/5 px-4 py-3">
      <div className="flex items-center gap-2">
        <p className="text-base">Profile Visibility</p>

        <Tooltip
          className="cursor-help"
          title="If your Profile Visibility is public, your Name, Avatar and Social Media Handles will be visible to everyone."
        >
          <LuInfo className="text-xl text-amber-500" />
        </Tooltip>
      </div>

      <Tooltip
        title={
          session?.user?.isPublicProfile
            ? 'Currently, your profile is public!'
            : 'Currently, your profile is private!'
        }
      >
        <Switch
          checked={session?.user?.isPublicProfile}
          size="default"
          onChange={() => togglePublicViewOfProfileMutation()}
        />
      </Tooltip>
    </div>
  )
}
