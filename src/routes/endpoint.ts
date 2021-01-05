import express, { Router } from "express"

export default class Endpoint {
  endpoint: string
  router: Router

  constructor () {
    this.router = express.Router()
  }
}