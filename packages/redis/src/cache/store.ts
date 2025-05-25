export type TCacheStore = {
  get(key: string): Promise<string | null>
  set(key: string, value: string, seconds?: number): Promise<void>
  del(...keys: string[]): Promise<void>
  keys(pattern: string): Promise<string[]>
}
