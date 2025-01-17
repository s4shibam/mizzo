export type TSuccess<Data = undefined> = {
  message: string
  data?: Data
  pagination?: TPagination
}

export type TError = {
  message: string
  statusCode: number
  statusText?: string
  stack?: string
  validationError?: TValidationError
}

export type TValidationError = {
  fields: string[]
  details: {
    field: string
    message: string
    code: string
  }[]
}

export type TPagination = {
  currentPage: number
  perPage: number
  totalPages: number
  totalItems: number
}

export type TPaginationParams = {
  currentPage: number
  perPage: number
}
