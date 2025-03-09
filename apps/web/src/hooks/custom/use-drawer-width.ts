import { useEffect, useState } from 'react'

export const useDrawerWidth = (maxWidth = 420) => {
  const [drawerWidth, setDrawerWidth] = useState(0)

  useEffect(() => {
    setDrawerWidth(window.innerWidth)

    window.addEventListener('resize', () => {
      setDrawerWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => {
        setDrawerWidth(window.innerWidth)
      })
    }
  }, [])

  return { drawerWidth: drawerWidth > maxWidth ? maxWidth : drawerWidth }
}
