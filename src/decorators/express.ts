import { Router } from 'express'

type Constructor = new (...args: any[]) => {}
interface Meta {
  requestType: 'get' | 'post' | 'put' | 'delete' | 'head' | 'trace' | 'options' | 'connect' | 'patch'
  route: string
  methodName: string
}
const routeHandler = Symbol('routeHandler')

export function Route (endpoint: string) {
  return function <T extends Constructor> (target: T) {
    return class extends target {
      router: Router
      endpoint: string

      constructor (...args: any[]) {
        super(...args)
        this.router = Router()
        this.endpoint = endpoint
        const routeHandlers = target.prototype[routeHandler] as []

        if (routeHandlers.length > 0) {
          target.prototype[routeHandler].forEach(({ requestType, route, methodName }: Meta) => {
            switch (requestType) {
              case 'get':
                this.router.get(route, target.prototype[methodName].bind(this))
                break
              case 'post':
                this.router.post(route, target.prototype[methodName].bind(this))
            }
          })
        }
      }
    }
  }
}

export function Post (route?: string) {
  return function (target: any, methodName: string) {
    const currentHandler = target[routeHandler] as [] | undefined
    target[routeHandler] = currentHandler ?? []
    // Create metaData
    const meta: Meta = {
      requestType: 'post',
      route: route ?? '/',
      methodName
    }

    target[routeHandler].push(meta)
  }
}

export function Get (route?: string) {
  return function (target: any, methodName: string) {
    const currentHandler = target[routeHandler] as [] | undefined
    target[routeHandler] = currentHandler ?? []
    // Create metaData
    const meta: Meta = {
      requestType: 'get',
      route: route ?? '/',
      methodName
    }

    target[routeHandler].push(meta)
  }
}
