import { useEffect } from 'react'

import { Button, Form, Input, Radio, Upload } from 'antd'
import { useSession } from 'next-auth/react'
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitter
} from 'react-icons/bi'
import { LuCircleUserRound, LuCloudUpload, LuMail } from 'react-icons/lu'

import { ProfileVisibilityToggler } from '@/components/common/profile-visibility-toggler'
import { useUpdateProfileForm } from '@/hooks/form/use-update-profile-form'

export const UpdateProfileForm = ({ close }: { close: () => void }) => {
  const { data: session } = useSession()
  const {
    form,
    avatarUpdateOption,
    isSubmitting,
    setAvatarUpdateOption,
    handleAvatarChange,
    handleProfileUpdate
  } = useUpdateProfileForm(close)

  useEffect(() => {
    form.setFieldsValue({
      name: session?.user?.name,
      email: session?.user?.email,
      bio: session?.user?.profile.bio,
      facebook: session?.user?.profile.facebook,
      instagram: session?.user?.profile.instagram,
      twitter: session?.user?.profile.twitter
    })
  }, [form, session])

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
      onFinish={handleProfileUpdate}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Enter your name' }]}
      >
        <Input
          placeholder="Enter your name"
          prefix={<LuCircleUserRound />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Enter your email' }]}
      >
        <Input
          disabled
          placeholder="Enter your email"
          prefix={<LuMail />}
          size="large"
        />
      </Form.Item>

      <Form.Item label="Bio" name="bio">
        <Input.TextArea placeholder="Enter your bio" rows={3} size="large" />
      </Form.Item>

      <Form.Item label="Facebook" name="facebook">
        <Input
          placeholder="Enter your facebook profile link"
          prefix={<BiLogoFacebookCircle />}
          size="large"
        />
      </Form.Item>

      <Form.Item label="Instagram" name="instagram">
        <Input
          placeholder="Enter your instagram profile link"
          prefix={<BiLogoInstagramAlt />}
          size="large"
        />
      </Form.Item>

      <Form.Item label="Twitter" name="twitter">
        <Input
          placeholder="Enter your twitter profile link"
          prefix={<BiLogoTwitter />}
          size="large"
        />
      </Form.Item>

      <Form.Item label="Profile Picture Update Option">
        <Radio.Group
          value={avatarUpdateOption}
          onChange={(e) => setAvatarUpdateOption(e.target.value)}
        >
          <Radio
            className="!text-base"
            disabled={!session?.user?.profile?.avatarKey}
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

      {avatarUpdateOption === 'UPDATE' && (
        <Form.Item
          label="Profile Picture"
          name="avatarFile"
          rules={[
            {
              required: true,
              message: 'Upload your profile picture'
            }
          ]}
        >
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            prefixCls="profile-picture-upload"
            onChange={(info) => handleAvatarChange(info.fileList)}
          >
            <Button icon={<LuCloudUpload />} size="large">
              Upload New
            </Button>
          </Upload>
        </Form.Item>
      )}

      <ProfileVisibilityToggler />

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
