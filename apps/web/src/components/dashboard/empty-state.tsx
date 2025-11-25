import { Empty } from 'antd'

export const EmptyState = ({ description }: { description: string }) => (
  <div className="flex min-h-[200px] items-center justify-center">
    <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </div>
)
