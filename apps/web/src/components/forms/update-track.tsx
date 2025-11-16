import { useEffect } from 'react'

import { Button, Form, Input, Radio, Select, Upload } from 'antd'
import {
  LuCloudUpload,
  LuLanguages,
  LuMusic2,
  LuTag,
  LuUsers
} from 'react-icons/lu'

import { useSearchUsersByUserName } from '@/hooks/api/search'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useUpdateTrackForm } from '@/hooks/form/use-update-track-form'
import type { Track } from '@/types/track'

const { TextArea: InputTextArea } = Input

type UpdateTrackFormProps = {
  track: Track
  close: () => void
}

export const UpdateTrackForm = ({ track, close }: UpdateTrackFormProps) => {
  const [artistSearchQuery, setArtistSearchQuery, debouncedSearchQuery] =
    useDebounce('', 500)

  const {
    data: artists,
    refetch: refetchArtists,
    isRefetching: isArtistsRefetching
  } = useSearchUsersByUserName(
    { search: debouncedSearchQuery },
    { enabled: false }
  )

  const {
    form,
    languageList,
    isPublic,
    posterUpdateOption,
    isSubmitting,
    setIsPublic,
    setPosterUpdateOption,
    handlePosterChange,
    handleTrackUpdate
  } = useUpdateTrackForm(track, close)

  const handleSearchArtists = (searchValue: string) => {
    setArtistSearchQuery(searchValue)
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    form.setFieldsValue({
      title: track.title,
      language: track.language,
      tags: track.tags?.split(','),
      lyrics: track.lyrics,
      isPublic: track.isPublic,
      secondaryArtistIds:
        track.secondaryArtists?.map((artist) => artist.id) || []
    })
  }, [form, track])

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      refetchArtists()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery])

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
      onFinish={handleTrackUpdate}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Enter track title' }]}
      >
        <Input
          className="[&>*]:py-1"
          placeholder="Enter track title"
          prefix={<LuMusic2 className="mr-2 text-2xl" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
        rules={[{ required: true, message: 'Select track language' }]}
      >
        <Select
          showSearch
          filterOption={filterOption}
          options={languageList.map((language) => ({
            label: language,
            value: language
          }))}
          placeholder="Select a language"
          size="large"
          suffixIcon={<LuLanguages />}
        />
      </Form.Item>

      <Form.Item
        label="Tags (Max Count: 10)"
        name="tags"
        rules={[{ required: true, message: 'Minimum 1 tag is required' }]}
      >
        <Select
          maxTagCount={10}
          mode="tags"
          placeholder="Enter tags for the track"
          size="large"
          suffixIcon={<LuTag />}
          tokenSeparators={[',']}
        />
      </Form.Item>

      <Form.Item
        label="Secondary Artists"
        name="secondaryArtistIds"
        tooltip="Search and select other artists who contributed to this track"
      >
        <Select
          showSearch
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
            label: artist.name,
            value: artist.id
          }))}
          placeholder="Search for artists"
          size="large"
          suffixIcon={<LuUsers />}
          onSearch={handleSearchArtists}
        />
      </Form.Item>

      <Form.Item label="Track Visibility">
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
      </Form.Item>

      <Form.Item label="Track Poster Update Option">
        <Radio.Group
          value={posterUpdateOption}
          onChange={(e) => setPosterUpdateOption(e.target.value)}
        >
          <Radio
            className="!text-base"
            disabled={!track.posterKey}
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
          label="Track Poster"
          name="posterFile"
          rules={[
            {
              required: true,
              message: 'Upload track poster'
            }
          ]}
        >
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            prefixCls="profile-picture-upload"
            onChange={(info) => handlePosterChange(info.fileList)}
          >
            <Button icon={<LuCloudUpload />} size="large">
              Upload New
            </Button>
          </Upload>
        </Form.Item>
      )}

      <Form.Item label="Lyrics" name="lyrics">
        <InputTextArea
          autoSize={{ minRows: 10, maxRows: 20 }}
          placeholder="Enter track lyrics (optional)"
          size="large"
        />
      </Form.Item>

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
