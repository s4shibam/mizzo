import { resolve } from 'path'

// In CommonJS, __dirname is available globally
export const getEnvPath = (envFile = '.env') => {
  const envPath = resolve(__dirname, `../../../${envFile}`)

  return envPath
}
