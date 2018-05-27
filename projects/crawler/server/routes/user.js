import { controller, post } from '../lib/decorator'
import { checkPassword } from '../service/movie'

@controller('/api/v1/user')
export class userController {
  @post('/')
  async login (ctx) {
    const { email, password } = ctx.request.body
    const result = await checkPassword(email, password)

    if (!result.user) {
      return (ctx.body = { code: 1 })
    }

    if (result.match) {
      return (ctx.body = { code: 0 })
    }

    return (ctx.body = { code: 0 })
  }
}