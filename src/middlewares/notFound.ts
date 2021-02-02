import { Response, Request } from 'express'
import { Service } from 'typedi'

@Service()
export default class NotFound {
  handleNotFound (_: Request, res: Response): Response {
    return res.status(404).json({
      code: '404',
      message: 'The requested route or method is not valid'
    })
  }
}
