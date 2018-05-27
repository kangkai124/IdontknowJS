import glob from 'glob'
import Router from 'koa-router'
import { resolve } from 'path'
import _ from 'lodash'

const symbolPrefix = Symbol('prefix')
let routerMap = new Map()
const isArray = c => _.isArray(c) ? c : [c]

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, '**/*.js').forEach(require)) 

    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      let prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key) => {
  conf.path = normalizePath(conf.path)

  routerMap.set({ target, ...conf }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
  path, method: 'get'
})

export const post = path => router({
  path, method: 'post'
})

export const put = path => router({
  path, method: 'put'
})

export const del = path => router({
  path, method: 'del'
})

export const use = path => router({
  path, method: 'use'
})

export const all = path => router({
  path, method: 'all'
})