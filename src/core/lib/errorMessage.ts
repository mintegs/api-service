import i18n from './i18n'

let instance = null

export class ErrorMessage extends Error {
  public status!: number
  public properties?: any
  private static instance: ErrorMessage

  public static getInstance(): ErrorMessage {
    if (!ErrorMessage.instance) {
      ErrorMessage.instance = new ErrorMessage()
    }
    return ErrorMessage.instance
  }

  static setter(
    name: string,
    message: string,
    status: number,
    properties?: any
  ): ErrorMessage {
    instance = this.getInstance()
    instance.name = name
    instance.message = message
    instance.status = status
    instance.properties = properties
    return instance
  }

  static notFound(properties?: any) {
    return this.setter(
      'Resource not found',
      'The specified Resource does not exist',
      404,
      properties
    )
  }

  static badRequest(properties?: any) {
    return this.setter(
      'Bad request',
      'Your request is invalid and the server is unable to respond',
      400,
      properties
    )
  }

  static serverError(properties?: any) {
    return this.setter(
      'Internal Server Error',
      'Request could not be carried out',
      500,
      properties
    )
  }
}

export class PublicErrorMessage {
  public name!: string
  public message!: string
  public status!: number
  public properties?: any
  private static instance: PublicErrorMessage

  public static getInstance(): PublicErrorMessage {
    if (!PublicErrorMessage.instance) {
      PublicErrorMessage.instance = new PublicErrorMessage()
    }
    return PublicErrorMessage.instance
  }

  static setter(error: ErrorMessage): PublicErrorMessage {
    instance = this.getInstance()
    instance.name = error.name
    instance.message = error.message
    instance.status = error.status
    instance.properties = error.properties
    return instance
  }

  get withOutStatus() {
    return {
      message: i18n.__(this.message),
      properties: this.properties,
    }
  }
}
