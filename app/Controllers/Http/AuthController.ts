import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {

  /**
   * @author Abdullah Hegab
   * @description Register new user
   * @param request
   * @param response
   */
  public async register({request, response}: HttpContextContract) {
    const newUserData = await schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({table: 'users', column: 'email'})
      ]),
      password: schema.string({}, [
        rules.confirmed()
      ])
    });
    const validatedNewUserData = await request.validate({schema: newUserData});
    const newUser = await User.create(validatedNewUserData);

    response.status(200);
    return response.created(newUser);
  }

  /**
   * @author Abdullah Hegab
   * @description provide login to an existing user
   * @param request
   * @param response
   * @param auth
   */
  public async login({request, response, auth}: HttpContextContract) {

    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password, {expiresIn: '7days'});
      return token.toJSON();
    } catch {
      return response.unauthorized('Invalid credentials');
    }
  }
}

