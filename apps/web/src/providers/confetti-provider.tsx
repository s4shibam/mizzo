'use client'

import { useEffect, useState } from 'react'

import ReactConfetti from 'react-confetti'

export const ConfettiProvider = () => {
  const [confettiActive, setConfettiActive] = useState(true)

  useEffect(() => {
    setConfettiActive(true)

    setTimeout(() => {
      setConfettiActive(false)
    }, 5000)
  }, [])

  if (!confettiActive) {
    return null
  }

  return (
    <div className="fixed inset-0 h-screen">
      <ReactConfetti
        className="pointer-events-none z-[100]"
        height={window.innerHeight}
        numberOfPieces={500}
        recycle={false}
        width={window.innerWidth}
      />
    </div>
  )
}
