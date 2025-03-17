import type { ReactNode } from 'react'

import { Modal } from 'antd'
import { LuHourglass, LuX } from 'react-icons/lu'

import { useOpenClose } from '@/hooks/custom/use-open-close'

type ComingSoonModalProps = {
  children: (openModal: () => void) => ReactNode
  className?: string
  featureName: string
}

export const ComingSoonModal = ({
  children,
  featureName
}: ComingSoonModalProps) => {
  const { isOpen, open, close } = useOpenClose()

  return (
    <>
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
              Coming Soon
            </h3>

            <p className="text-lg">{featureName} is under development</p>
          </div>

          <div className="relative mx-auto size-24">
            <div className="bg-primary/10 absolute inset-0 rounded-full" />

            <div className="relative grid h-full place-items-center">
              <LuHourglass className="text-primary size-12" />
            </div>
          </div>

          <p className="text-center">
            We&apos;re crafting something special for you
          </p>
        </div>
      </Modal>
      {children(open)}
    </>
  )
}
