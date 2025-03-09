import { useState } from 'react'

export const useOpenClose = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return { isOpen, open, close, toggle }
}
