class CustomError extends Error {
  statusCode: number

  constructor(
    message: string = 'Internal server error',
    statusCode: number = 500
  ) {
    super(message)
    this.statusCode = statusCode

    Object.setPrototypeOf(this, CustomError.prototype)

    Error.captureStackTrace(this, this.constructor)
  }
}

export default CustomError
