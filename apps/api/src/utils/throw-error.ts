import CustomError from './CustomError'

export function throwError(
  message = 'Internal error occurred',
  status_code = 500
): never {
  throw new CustomError(message, status_code)
}
