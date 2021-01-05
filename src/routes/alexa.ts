import { NextFunction, Request, Response } from "express";
import ErrorHandler from "middlewares/errorHandler";
import { Voxa } from "services/voxa";
import { Service } from "typedi";
import Endpoint from "./endpoint";

@Service()
export default class Alexa extends Endpoint {
  constructor (
    private voxa: Voxa
  ) {
    super();
    this.endpoint = '/alexa'
    this.router.post('/', (req, res, next) => this.post(req, res, next, this))
  }

  async post(req: Request, res: Response, next: NextFunction, context: Alexa) {
    try {
      const skill = context.voxa.getAlexaSkill()
      const reply = await skill.execute(req.body)
      res.json(reply)
    } catch (e) {
      next(new ErrorHandler(505, `Error replying to request. ${e.message}`))
    }
  }
}