import { Drawer, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import {
  LuBell,
  LuBellDot,
  LuCalendar,
  LuCheck,
  LuClock,
  LuTrash2
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import {
  useGetAllNotifications,
  useUpdateNotification
} from '@/hooks/api/notification'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { getFormattedDate, getFormattedTime } from '@/lib/dayjs'
import { invalidateQueries } from '@/services/tanstack'

import { ErrorInfo } from './error-info'
import { Loader } from './loader'

export const Notifications = () => {
  const { status } = useSession()

  const { isOpen, open, close } = useOpenClose()
  const {
    data: notifications,
    isLoading,
    error
  } = useGetAllNotifications({
    enabled: status === 'authenticated'
  })

  const { mutate: updateNotificationMutation, isPending } =
    useUpdateNotification({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        invalidateQueries({ queryKey: ['useGetAllNotifications'] })
        toast.success(success?.message)
      }
    })

  const handleAction = (id: number, action: 'read' | 'delete') => {
    updateNotificationMutation({ id, action })
  }

  if (status !== 'authenticated') {
    return null
  }

  return (
    <>
      <button
        className={cn(
          'relative flex size-7 cursor-pointer rounded-full p-1 transition-colors hover:bg-black/20',
          { 'bg-primary/20 text-primary hover:bg-primary/10': isOpen }
        )}
        onClick={isOpen ? close : open}
      >
        {(notifications?.data?.unreadCount ?? 0) > 0 ? (
          <LuBellDot className="size-full transition-transform group-hover:scale-110" />
        ) : (
          <LuBell className="size-full text-zinc-500 transition-transform group-hover:scale-110" />
        )}
      </button>

      <Drawer
        closeIcon={false}
        open={isOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Notifications"
        width={380}
        onClose={close}
      >
        <Loader loading={isLoading} />

        <ErrorInfo error={error} />

        {!notifications?.data?.notifications?.length && (
          <ErrorInfo
            customIcon={<LuBell className="size-16 text-zinc-500" />}
            customMessage="No notifications yet"
            customStatusCode={404}
          />
        )}

        <div className="space-y-4">
          {notifications?.data?.notifications?.map((notification) => (
            <div
              key={notification?.id}
              className="hover:border-primary group relative flex items-start gap-3 overflow-hidden rounded-lg border border-transparent bg-white p-4 transition-all"
            >
              {!notification?.readAt && (
                <div className="bg-primary absolute right-2 top-2 size-2 rounded-full" />
              )}

              <div className="flex-1 space-y-2">
                <p
                  className={cn(
                    'text-sm',
                    notification?.readAt
                      ? 'text-zinc-500'
                      : 'font-medium text-zinc-700'
                  )}
                >
                  {notification?.message}
                </p>

                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <LuCalendar className="size-3" />
                  {getFormattedDate(notification?.createdAt)}

                  <p />

                  <LuClock className="size-3" />
                  {getFormattedTime(notification?.createdAt)}
                </div>
              </div>

              <div className="invisible absolute bottom-0 right-0 space-x-1 overflow-hidden opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {!notification?.readAt && (
                  <Tooltip title="Mark as read">
                    <button
                      className="hover:bg-primary-light p-1.5"
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAction(notification.id, 'read')
                      }}
                    >
                      <LuCheck className="text-primary size-4" />
                    </button>
                  </Tooltip>
                )}

                <Tooltip title="Delete">
                  <button
                    className="p-1.5 hover:bg-red-100"
                    disabled={isPending}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAction(notification.id, 'delete')
                    }}
                  >
                    <LuTrash2 className="size-4 text-red-500" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  )
}
