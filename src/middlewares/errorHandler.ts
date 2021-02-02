import { Response } from 'express'
import { Service } from 'typedi'

@Service()
export default class ErrorHandler extends Error {
  statusCode: number
  constructor (statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }

  public handleError (err: ErrorHandler, res: Response): Response {
    const { statusCode, message } = err
    console.log(statusCode, message)
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    })
  }
}
