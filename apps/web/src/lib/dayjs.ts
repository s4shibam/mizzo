import dayjs from 'dayjs'

export const getDurationInHMS = (seconds = 0) => {
  seconds = Math.floor(seconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const hh = hours.toString().padStart(2, '0')
  const mm = minutes.toString().padStart(2, '0')
  const ss = remainingSeconds.toString().padStart(2, '0')

  if (hours > 0) {
    return `${hh}:${mm}:${ss}`
  } else if (minutes > 0) {
    return `${mm}:${ss}`
  } else {
    return `00:${ss}`
  }
}

export const getDurationInHMSWithText = ({
  secs = 0,
  minimal = false
}: {
  secs?: number
  minimal?: boolean
}) => {
  const hours = Math.floor(secs / 3600)
  const minutes = Math.floor((secs % 3600) / 60)
  const remainingSeconds = secs % 60

  const hh = hours.toString().padStart(2, '0')
  const mm = minutes.toString().padStart(2, '0')
  const ss = remainingSeconds.toString().padStart(2, '0')

  if (minimal) {
    if (hours > 0) {
      return `${hours}+ Hr`
    } else if (minutes > 0) {
      return `${minutes}+ Min`
    }
  }

  if (hours > 0) {
    return `${hh} Hr ${mm} Min ${ss} Sec`
  } else if (minutes > 0) {
    return `${mm} Min ${ss} Sec`
  } else {
    return `${ss} Sec`
  }
}

export const getYear = (date?: Date) => {
  if (!date) return 'Not Provided'
  return dayjs(date).year()
}

export const getFormattedDate = (date?: Date, format?: string) => {
  if (!date) return 'Not Provided'
  return dayjs(date).format(format || 'ddd, MMM DD, YYYY')
}

export const getFormattedTime = (date?: Date, format?: string) => {
  if (!date) return 'Not Provided'
  return dayjs(date).format(format || 'hh:mm:ss A')
}
