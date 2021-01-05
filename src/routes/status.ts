import { Request, Response } from "express";
import { Service } from "typedi";
import Endpoint from "./endpoint";

@Service()
export default class Status extends Endpoint {
  constructor () {
    super()
    this.endpoint = `/status`
    this.router.get('/', this.get)
  }

  get(_: Request, res: Response) {
    return res.json({ status: 'ok' })
  }
}