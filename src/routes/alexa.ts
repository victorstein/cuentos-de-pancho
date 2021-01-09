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
  transaction: Transaction
  constructor (
    private voxa: Voxa
  ) {
    super();
    this.endpoint = '/alexa'
    this.router.post('/', (req, res, next) => this.post(req, res, next, this))
  }

  createTransaction (req: Request) {
    try {
      // Get request data
      const voxaRequest: AlexaRequest = req.body
      const name = voxaRequest.request?.intent?.name
      const requestType = voxaRequest.request.type
      const userId = voxaRequest?.session?.user?.userId
      // Start monitoring
      this.transaction = Sentry.startTransaction({ name: name || requestType, data: voxaRequest }) as Transaction
      Sentry.setUser({ id: userId });
    } catch (e) {
      throw new Error(e)
    }
  }

  async post(req: Request, res: Response, next: NextFunction, context: Alexa) {
    try {
      this.createTransaction(req)
      const skill = context.voxa.getAlexaSkill()
      const reply = await skill.execute(req.body)
      this.transaction.finish()
      res.json(reply)
    } catch (e) {
      this.transaction.finish()
      next(new ErrorHandler(505, `Error replying to request. ${e.message}`))
    }
  }
}