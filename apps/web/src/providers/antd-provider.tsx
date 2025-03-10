import type { ReactNode } from 'react'

import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

import { colors } from '@mizzo/tailwind-config/theme'

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyleProvider layer hashPriority="high">
      <ConfigProvider
        theme={{
          cssVar: true,
          token: {
            colorPrimary: colors.primary.DEFAULT,
            fontFamily: 'Outfit',
            wireframe: false,
            borderRadius: 6
          },
          components: {
            Tooltip: { sizePopupArrow: 0 }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  )
}
