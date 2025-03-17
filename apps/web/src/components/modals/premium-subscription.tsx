import { Button, Modal } from 'antd'
import { LuStar, LuX } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

type PremiumSubscriptionModalProps = {
  featureName: string
  isOpen: boolean
  close: () => void
}

export const PremiumSubscriptionModal = ({
  featureName,
  isOpen,
  close
}: PremiumSubscriptionModalProps) => {
  return (
    <Modal
      centered
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
            Get Premium
          </h3>

          <p className="text-lg">
            Subscribe to{' '}
            <span className="font-medium capitalize">{APP_SLUG_CAP}</span>{' '}
            premium to use{' '}
            <span className="text-primary font-medium">{featureName}</span>
          </p>
        </div>

        <div className="relative mx-auto size-32">
          <div className="bg-primary/10 absolute inset-0 rounded-full" />

          <div className="relative grid h-full place-items-center">
            <LuStar className="text-primary size-16" />
          </div>
        </div>

        <p className="text-center text-lg">
          Gift yourself a premium to Listen to ad-free music and also explore
          other exclusive features.
        </p>

        <div className="text-center">
          <Button
            className="h-12 w-44"
            href="/premium"
            size="large"
            type="primary"
          >
            Explore Premium
          </Button>
        </div>
      </div>
    </Modal>
  )
}
