import { Button, Form, Input, Modal } from 'antd'
import { toast } from 'react-hot-toast'
import { LuListMusic, LuPlus, LuX } from 'react-icons/lu'

import { useCreatePlaylist } from '@/hooks/api/playlist'
import { invalidateQueries } from '@/services/tanstack'

type CreatePlaylistModalProps = {
  isOpen: boolean
  close: () => void
}

export const CreatePlaylistModal = ({
  isOpen,
  close
}: CreatePlaylistModalProps) => {
  const [form] = Form.useForm()

  const { mutate: createPlaylistMutation, isPending: createPlaylistPending } =
    useCreatePlaylist({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetMyPlaylists'] })
        close()
      }
    })

  const handleCreatePlaylist = (values: { name: string }) => {
    createPlaylistMutation({
      name: values.name
    })
  }

  return (
    <Modal
      centered
      destroyOnClose
      closeIcon={
        <div className="grid place-items-center transition-colors">
          <LuX />
        </div>
      }
      footer={null}
      open={isOpen}
      width={500}
      onCancel={close}
    >
      <div className="space-y-8 py-4">
        <div className="text-center">
          <h3 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Create Playlist
          </h3>

          <p className="text-lg">
            Create a new playlist to organize your music
          </p>
        </div>

        <Form
          className="w-full"
          form={form}
          layout="vertical"
          requiredMark={false}
          scrollToFirstError={{
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          }}
          onFinish={handleCreatePlaylist}
        >
          <Form.Item
            label="Playlist Name"
            name="name"
            rules={[{ required: true, message: 'Enter playlist name!' }]}
          >
            <Input
              placeholder="Enter playlist name"
              prefix={<LuListMusic className="text-primary mr-1 size-5" />}
              size="large"
            />
          </Form.Item>

          <Form.Item className="mb-0 mt-8 flex justify-center">
            <Button
              className="w-40"
              htmlType="submit"
              icon={<LuPlus />}
              loading={createPlaylistPending}
              size="large"
              type="primary"
            >
              Create Playlist
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
