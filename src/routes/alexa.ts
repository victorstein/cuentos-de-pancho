// import { Transaction } from "@sentry/tracing";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "middlewares/errorHandler";
import { Voxa } from "services/voxa";
import { Service } from "typedi";
import Endpoint from "./endpoint";
import * as Sentry from '@sentry/node'
import { AlexaRequest } from "services/voxa/types";
import { Transaction } from "@sentry/tracing";

@Service()
export default class Alexa extends Endpoint {
  constructor (
    private voxa: Voxa
  ) {
    super();
    this.endpoint = '/alexa'
    this.router.post('/', this.post)
  }

  createTransaction = (req: Request): Transaction => {
    try {
      // Get request data
      const voxaRequest: AlexaRequest = req.body
      const name = voxaRequest.request?.intent?.name
      const requestType = voxaRequest.request.type
      const userId = voxaRequest?.session?.user?.userId
      // Start monitoring
      const transaction = Sentry.startTransaction({ name: name || requestType, data: voxaRequest }) as Transaction
      Sentry.setUser({ id: userId });
      return transaction
    } catch (e) {
      throw new Error(e)
    }
  }

  post = async (req: Request, res: Response, next: NextFunction) => {
    let transaction
    try {
      transaction = this.createTransaction(req)
      const skill = this.voxa.getAlexaSkill()
      const reply = await skill.execute(req.body)
      transaction.finish()
      res.json(reply)
    } catch (e) {
      if (transaction) transaction.finish()
      next(new ErrorHandler(505, `Error replying to request. ${e.message}`))
    }
  }
}