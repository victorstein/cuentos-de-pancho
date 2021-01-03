import { Response, Request } from "express"

const notFound = (_: Request, res: Response) => {
  return res.status(404).json({
    code: '404',
    message: 'The requested route or method is not valid'
  })
}

export default notFound