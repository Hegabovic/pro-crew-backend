import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'





export default class IsAdmin {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if (auth.user?.role_id !== 2) {
      response.unauthorized({ error: 'Must be Admin' })
      return
    }
    await next()
  }
}
