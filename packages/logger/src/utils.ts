export const sanitizeData = (
  data: Record<string, any> | undefined
): Record<string, any> | undefined => {
  if (!data) return data

  const sanitized = { ...data }

  Object.keys(sanitized).forEach((key) => {
    if (key.toLowerCase().includes('password')) {
      sanitized[key] = '***'
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeData(sanitized[key])
    }
  })

  return sanitized
}
