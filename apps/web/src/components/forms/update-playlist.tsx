import { useEffect } from 'react'

import { Alert, Button, Form, Input, Radio, Upload } from 'antd'
import { LuCloudUpload, LuListMusic } from 'react-icons/lu'

import { useUpdatePlaylistForm } from '@/hooks/form/use-update-playlist-form'
import type { Playlist } from '@/types/playlist'

type UpdatePlaylistFormProps = {
  playlist: Playlist
  close: () => void
}

export const UpdatePlaylistForm = ({
  playlist,
  close
}: UpdatePlaylistFormProps) => {
  const {
    form,
    isPublic,
    isSubmitting,
    posterUpdateOption,
    setIsPublic,
    setPosterUpdateOption,
    handlePosterChange,
    handlePlaylistUpdate
  } = useUpdatePlaylistForm(playlist, close)

  useEffect(() => {
    form.setFieldsValue({
      name: playlist.name,
      description: playlist.description,
      isPublic: playlist.isPublic
    })
  }, [form, playlist])

  return (
    <Form
      className="pb-24"
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }}
      onFinish={handlePlaylistUpdate}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Enter playlist name' }]}
      >
        <Input
          placeholder="Enter playlist name"
          prefix={<LuListMusic />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: false, message: 'Enter playlist description' }]}
      >
        <Input.TextArea
          placeholder="Enter playlist description"
          rows={4}
          size="large"
        />
      </Form.Item>

      <Form.Item label="Playlist Visibility">
        <Radio.Group
          value={isPublic}
          onChange={(e) => setIsPublic(e.target.value)}
        >
          <Radio className="!text-base" value={false}>
            Private
          </Radio>
          <Radio className="!text-base" value={true}>
            Public
          </Radio>
        </Radio.Group>
        {playlist.isPublic && !isPublic && (
          <Alert
            className="mt-4 text-base"
            message="Making the playlist private will remove all likes on your playlist. And this action cannot be undone."
            type="warning"
          />
        )}
      </Form.Item>

      <Form.Item label="Playlist Poster Update Option">
        <Radio.Group
          value={posterUpdateOption}
          onChange={(e) => setPosterUpdateOption(e.target.value)}
        >
          <Radio
            className="!text-base"
            disabled={!playlist.posterKey}
            value="REMOVE"
          >
            Remove
          </Radio>
          <Radio className="!text-base" value="NO_CHANGE">
            No Change
          </Radio>
          <Radio className="!text-base" value="UPDATE">
            Add New
          </Radio>
        </Radio.Group>
      </Form.Item>

      {posterUpdateOption === 'UPDATE' && (
        <Form.Item
          label="Playlist Poster"
          name="posterFile"
          rules={[
            {
              required: true,
              message: 'Upload playlist poster'
            }
          ]}
        >
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            prefixCls="profile-picture-upload"
            onChange={({ fileList }) => handlePosterChange(fileList)}
          >
            <Button icon={<LuCloudUpload />} size="large">
              Upload New
            </Button>
          </Upload>
        </Form.Item>
      )}

      <div className="mz-accent-drawer-form-footer">
        <Button
          disabled={isSubmitting}
          size="large"
          type="default"
          onClick={close}
        >
          Cancel
        </Button>

        <Form.Item className="my-0">
          <Button
            className="w-full"
            disabled={isSubmitting}
            htmlType="submit"
            loading={isSubmitting}
            size="large"
            type="primary"
          >
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
