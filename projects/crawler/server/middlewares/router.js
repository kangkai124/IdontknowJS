import { Route } from '../lib/decorator'
import { resolve } from 'path'

const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)

  router.init()
}

export { router }