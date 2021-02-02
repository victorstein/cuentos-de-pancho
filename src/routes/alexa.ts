import { NextFunction, Request, Response } from 'express'
import ErrorHandler from 'middlewares/errorHandler'
import { Voxa } from 'services/voxa'
import { Service } from 'typedi'
import * as Sentry from '@sentry/node'
import { AlexaRequest } from 'services/voxa/types'
import { Transaction } from '@sentry/tracing'
import { Route, Post } from '../decorators/express'

@Service()
@Route('/alexa')
export default class Alexa {
  constructor (
    private readonly voxa: Voxa
  ) {}

  createTransaction = (req: Request): Transaction => {
    try {
      // Get request data
      const voxaRequest: AlexaRequest = req.body
      const name = voxaRequest.request?.intent?.name
      const requestType = voxaRequest.request.type
      const userId = voxaRequest?.session?.user?.userId
      // Start monitoring
      const transaction = Sentry.startTransaction({ name: name ?? requestType, data: voxaRequest }) as Transaction
      Sentry.setUser({ id: userId })
      return transaction
    } catch (e) {
      throw new Error(e)
    }
  }

  @Post()
  async post (req: Request, res: Response, next: NextFunction): Promise<void> {
    let transaction
    try {
      transaction = this.createTransaction(req)
      const skill = this.voxa.getAlexaSkill()
      const reply = await skill.execute(req.body)
      transaction.finish()
      res.json(reply)
    } catch (e) {
      if (transaction !== undefined) transaction.finish()
      next(new ErrorHandler(505, `Error replying to request. ${e.message as string}`))
    }
  }
}
