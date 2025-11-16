import { useEffect, useRef } from 'react'

import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Select,
  Upload
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { ConfettiProvider } from 'providers/confetti-provider'
import {
  LuCircleCheck,
  LuCloudUpload,
  LuCopyright,
  LuFileAudio,
  LuImageUp,
  LuInfo,
  LuUpload
} from 'react-icons/lu'

import { FileUploadInstructions } from '@/components/common/file-upload-instructions'
import { useSearchUsersByUserName } from '@/hooks/api/search'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useUploadTrackForm } from '@/hooks/form/use-upload-track-form'
import { getLanguageList, s3GetUrlFromKey } from '@/lib/utils'

export const UploadTrackForm = () => {
  const trackRef = useRef<HTMLAudioElement | null>(null)
  const languageList = getLanguageList()

  const [artistSearchQuery, setArtistSearchQuery, debouncedSearchQuery] =
    useDebounce('', 500)

  const {
    form,
    consent,
    successData,
    isSubmitting,
    trackPreview,
    posterPreview,
    setConsent,
    setDuration,
    handleTrackUpload,
    handleTrackChange,
    handlePosterChange
  } = useUploadTrackForm()

  const {
    data: artists,
    refetch: refetchArtists,
    isRefetching: isArtistsRefetching
  } = useSearchUsersByUserName(
    { search: debouncedSearchQuery },
    { enabled: false }
  )

  const handleSearchArtists = (searchValue: string) => {
    setArtistSearchQuery(searchValue)
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      refetchArtists()
    }
  }, [debouncedSearchQuery, refetchArtists])

  if (successData?.data) {
    return <UploadSuccessView title={successData.data.title} />
  }

  return (
    <Form
      className="w-full"
      disabled={isSubmitting}
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }}
      onFinish={handleTrackUpload}
    >
      <Card
        className="mb-6 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <LuUpload className="text-primary" />

            <span>Upload Media</span>
          </div>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Track Poster</h3>
            <div className="grid h-72 w-full place-items-center rounded-md border bg-zinc-50 p-3">
              {posterPreview ? (
                <div className="relative aspect-square h-full">
                  <Image
                    fill
                    alt="poster"
                    className="object-cover"
                    draggable={false}
                    src={posterPreview}
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
              {form.getFieldValue('posterFile')?.file?.name ||
                'Poster file name will show here'}
            </p>

            <Form.Item
              name="posterFile"
              rules={[
                {
                  required: true,
                  message: 'Select Poster to upload!'
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
                onChange={({ fileList }) => handlePosterChange(fileList)}
              >
                <Button
                  className="flex !h-10 w-full items-center justify-center"
                  icon={<LuImageUp />}
                  size="large"
                  type="primary"
                >
                  {posterPreview ? 'Change Poster' : 'Select Poster'}
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Audio Track</h3>
            <div className="grid h-72 w-full place-items-center rounded-md border bg-zinc-50 p-3">
              {trackPreview ? (
                <audio
                  key={trackPreview}
                  ref={trackRef}
                  controls
                  onLoadedMetadata={() =>
                    setDuration(trackRef?.current?.duration || 0)
                  }
                >
                  <source src={trackPreview} type="audio/mpeg" />
                  <source src={trackPreview} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <FileUploadInstructions
                  fileExtensions={['MP3', 'WAV']}
                  fileSize={10}
                  fileType="audio"
                  note="Bitrate: 128kbps to 320kbps"
                />
              )}
            </div>

            <p className="w-full truncate rounded-md bg-zinc-50 p-2 text-center text-sm text-zinc-700">
              {form.getFieldValue('trackFile')?.file?.name ||
                'Track file name will show here'}
            </p>

            <Form.Item
              name="trackFile"
              rules={[
                {
                  required: true,
                  message: 'Select Track to upload!'
                }
              ]}
            >
              <Upload
                accept="audio/*"
                beforeUpload={() => false}
                className="[&>*]:w-full"
                fileList={[]}
                multiple={false}
                showUploadList={false}
                onChange={({ fileList }) => handleTrackChange(fileList)}
              >
                <Button
                  className="flex !h-10 w-full items-center justify-center"
                  icon={<LuFileAudio />}
                  size="large"
                  type="primary"
                >
                  {trackPreview ? 'Change Track' : 'Select Track'}
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Card>

      <Card
        className="mb-6 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <LuInfo className="text-primary" />
            <span>Track Details</span>
          </div>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Form.Item
            label="Track Title"
            name="title"
            rules={[{ required: true, message: 'Enter Track Title' }]}
          >
            <Input
              className="h-11"
              placeholder="Enter track title"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Track Language"
            name="language"
            rules={[{ required: true, message: 'Select Track Language' }]}
            tooltip="Primary language of the track"
          >
            <Select
              showSearch
              className="h-11"
              filterOption={filterOption}
              options={languageList.map((language) => ({
                label: language,
                value: language
              }))}
              placeholder="Select a track language"
              size="large"
              virtual={false}
              onChange={(value) => form.setFieldValue('language', value)}
            />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            label="Tags"
            name="tags"
            tooltip="Tags help in search and categorization of the track (Max Count: 10)"
          >
            <Select
              className="h-11"
              dropdownStyle={{ display: 'none' }}
              maxTagCount={10}
              mode="tags"
              placeholder="Enter tags for the track"
              size="large"
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            label="Secondary Artists"
            name="secondaryArtistIds"
            tooltip="Other artists who contributed or collaborated on this track"
          >
            <Select
              showSearch
              className="h-11"
              defaultActiveFirstOption={false}
              filterOption={false}
              loading={isArtistsRefetching}
              mode="multiple"
              notFoundContent={
                artistSearchQuery.length < 2
                  ? 'Type at least 2 characters'
                  : 'No artists found'
              }
              optionFilterProp="label"
              options={artists?.data?.map((artist) => ({
                label: (
                  <div className="flex items-center gap-2">
                    <Avatar
                      alt={artist.name?.[0].toUpperCase()}
                      className="size-6 rounded-full"
                      src={s3GetUrlFromKey(artist.profile?.avatarKey) || ''}
                    />

                    {artist.name}
                  </div>
                ),
                value: artist.id
              }))}
              placeholder="Search for artists"
              size="large"
              value={artistSearchQuery}
              onSearch={handleSearchArtists}
            />
          </Form.Item>
        </div>
      </Card>

      <Card
        className="mb-6 shadow-sm"
        title={
          <div className="flex items-center gap-2">
            <LuCopyright className="text-primary" />

            <span>Copyright Declaration</span>
          </div>
        }
      >
        <div className="flex justify-center p-4">
          <div className="border-primary w-fit rounded-md border p-4">
            <Checkbox
              checked={consent}
              onChange={() => setConsent((prev) => !prev)}
            >
              <p className="text-base">
                Declaration of Originality: I confirm this track does not
                violate any copyright laws.
              </p>

              <p className="text-base">
                Platform Rules Compliance: I affirm I am not violating any
                platform rules.
              </p>
            </Checkbox>
          </div>
        </div>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button
          className="h-12 w-full sm:w-56"
          htmlType="submit"
          icon={<LuCloudUpload />}
          loading={isSubmitting}
          size="large"
          type="primary"
        >
          {isSubmitting ? 'Uploading Files...' : 'Upload Track'}
        </Button>
      </div>
    </Form>
  )
}

const UploadSuccessView = ({ title }: { title: string }) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 rounded-xl border p-6">
      <LuCircleCheck className="size-16 text-green-500" />

      <div className="max-w-md text-center">
        <h2 className="mb-3 text-3xl font-semibold text-zinc-800">
          Upload Successful
        </h2>

        <p className="mt-4 text-lg text-zinc-600">
          Your track <span className="font-semibold">{title}</span> has been
          uploaded successfully!
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Keep your patience, our team is reviewing your track.
          <br />
          Once approved, you will be notified.
        </p>
      </div>

      <div className="mt-4">
        <Link href="/studio/content">
          <Button icon={<LuUpload />} size="large" type="primary">
            Go to Content
          </Button>
        </Link>
      </div>
      <ConfettiProvider />
    </div>
  )
}
