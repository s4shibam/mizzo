export const buildQueryString = (obj: Record<string, string | undefined>) => {
  const qs = Object.keys(obj)
    .filter(
      (key) => obj[key] !== '' && obj[key] !== undefined && obj[key] !== null
    )
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key]!)}`
    )
    .join('&')

  return qs
}
