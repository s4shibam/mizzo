import { Button, Card, Form, Input, Select, Upload } from 'antd'
import Image from 'next/image'
import { LuClipboardCheck, LuFileUp, LuUpload } from 'react-icons/lu'

import { ACCEPTABLE_ID_PROOFS } from '@mizzo/utils'

import { useArtistApplicationForm } from '@/hooks/form/use-artist-application-form'

import { FileUploadInstructions } from '../common/file-upload-instructions'

export const SubmitArtistApplicationForm = () => {
  const {
    form,
    isFormSubmitting,
    idProofPreview,
    handleIdProofChange,
    handleArtistApplicationSubmit
  } = useArtistApplicationForm()

  return (
    <Form
      className="w-full"
      disabled={isFormSubmitting}
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }}
      onFinish={handleArtistApplicationSubmit}
    >
      <Card
        className="mb-6 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <LuUpload className="text-primary" />
            <span>Upload Documents</span>
          </div>
        }
      >
        <div className="mx-auto flex max-w-md flex-col gap-3">
          <h3 className="text-center text-lg font-medium">Identity Proof</h3>
          <div className="grid h-[250px] w-full place-items-center rounded-md border bg-zinc-50 p-3">
            {idProofPreview ? (
              <div className="relative size-full">
                <Image
                  fill
                  alt="id-proof"
                  className="object-contain"
                  draggable={false}
                  src={idProofPreview}
                />
              </div>
            ) : (
              <FileUploadInstructions
                fileExtensions={['PNG', 'JPG', 'JPEG', 'WEBP']}
                fileSize={1}
                fileType="image"
                note="Dimension: 500x500 (in pixels)"
              />
            )}
          </div>
          <p className="w-full truncate rounded-md bg-zinc-50 p-2 text-center text-sm text-zinc-700">
            {form.getFieldValue('idProofFile')?.file?.name ||
              'Identity Proof file name will show here'}
          </p>
          <Form.Item
            name="idProofFile"
            rules={[
              {
                required: true,
                message: 'Select Identity Proof to upload!'
              }
            ]}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              className="[&>*]:w-full"
              fileList={[]}
              multiple={false}
              showUploadList={false}
              onChange={({ fileList }) => handleIdProofChange(fileList)}
            >
              <Button block icon={<LuUpload />} size="large" type="primary">
                {idProofPreview
                  ? 'Change Identity Proof'
                  : 'Select Identity Proof'}
              </Button>
            </Upload>
          </Form.Item>
        </div>
      </Card>

      <Card
        className="mb-6 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <LuClipboardCheck className="text-primary" />

            <span>Application Details</span>
          </div>
        }
      >
        <div className="space-y-4">
          <Form.Item
            label="ID Proof Type"
            name="idProofType"
            rules={[
              { required: true, message: 'Enter provided ID proof type' }
            ]}
          >
            <Select
              className="w-full"
              options={ACCEPTABLE_ID_PROOFS.map((type) => ({
                label: type,
                value: type
              }))}
              placeholder="Select ID Proof Type"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Reason for application"
            name="message"
            rules={[
              { required: true, message: 'Enter reason for application' }
            ]}
          >
            <Input.TextArea
              className="w-full"
              placeholder="Enter reason for application: like why you want to be an artist"
              rows={4}
              size="large"
            />
          </Form.Item>
        </div>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button
          className="flex h-12 w-full sm:w-56"
          htmlType="submit"
          icon={<LuFileUp />}
          loading={isFormSubmitting}
          size="large"
          type="primary"
        >
          {isFormSubmitting ? 'Uploading Files...' : 'Submit Application'}
        </Button>
      </div>
    </Form>
  )
}
