import { Empty } from 'antd'

type NoDataProps = {
  description?: string
}

export const NoData = ({ description }: NoDataProps) => {
  return (
    <div className="grid h-auto w-full place-items-center">
      <Empty
        description={false}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        styles={{ image: { height: '160px' } }}
      >
        <p className="text-lg">{description}</p>
      </Empty>
    </div>
  )
}

export default NoData
