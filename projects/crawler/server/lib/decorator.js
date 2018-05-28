import glob from 'glob'
import Router from 'koa-router'
import { resolve } from 'path'
import _ from 'lodash'

const symbolPrefix = Symbol('prefix')
// TODO: [c]  not [...c]
const isArray = c => _.isArray(c) ? c : [c]
let routerMap = new Map()

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init () {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require) 

    // TODO: what is controller?
    for (let [conf, controller] of routerMap) {
      // console.log(conf, controller, routerMap)
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
  const { path, method } = conf

  routerMap.set({ target, path, method }, target[key])
  // console.log(routerMap)
  
  // TODO: 1. why can not use ...conf
  //       2. console.log not print
  // routerMap.set({ target, ...conf }, target[key])
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