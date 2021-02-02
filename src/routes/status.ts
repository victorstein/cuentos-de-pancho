import { Route, Get } from 'decorators/express'
import { Request, Response } from 'express'
import { Service } from 'typedi'

@Service()
@Route('/status')
export default class Status {
  @Get()
  get (_: Request, res: Response): Response {
    return res.json({ status: 'ok' })
  }
}
