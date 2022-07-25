import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import Role from "App/Models/Role";



export default class AuthController {

  /**
   * @author Abdullah Hegab
   * @description Register new user
   * @param request
   * @param response
   */
  public async register({request, response}: HttpContextContract) {
    const newUserData = await schema.create({
      name: schema.string({}, [rules.trim()]),
      email: schema.string({}, [rules.email(), rules.unique({table: 'users', column: 'email'})]),
      password: schema.string({}, [rules.confirmed()])
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
      await User
        .query()
        .where('email', email)
        .update({remember_me_token: token.toJSON().token})

      const user =  await User
        .query()
        .where('email', email)


      const role = await Role
        .query()
        .where('id',user[0].role_id)


      return {
        username: user[0].name,
        role: role[0].name,


        token: token.toJSON().token
      }
    } catch {
      return response.unauthorized('Invalid credentials');
    }
  }

  public async logout({auth}:HttpContextContract){
     await auth.logout()
    return {message:"logged out successfully"}

  }
  /**
   * @author Abdullah Hegab
   * @description Get all Users
   * @param response
   */
  public async index({response}: HttpContextContract) {
    const users = await User.all();
    if (users.length > 0) {
      response.status(200)
      return {
        data: users
      };
    } else {
      response.status(404);
      return {
        message: "data not found, try again later"
      };
    }
  }


  /**
   * @author Abdullah Hegab
   * @description sending email with a link to reset password
   * @param request
   */
  public async resetPassword({request}: HttpContextContract) {
    const email = request.input('email');
    const isUserExist = await User.query().where('email', email)
    // return isUserExist.length > 0;
    if (isUserExist.length > 0) { // true
      await Mail.send((message) => {
        message
          .to(email)
        // .from('admin@admin.com')
        // .subject('Verify your password')
        // .htmlView('emails/reset_password')
      });
      return "mail sent"
    } else {
      return {message: "email doesn't exist"}
    }
  }

  /**
   * @author Abdullah Hegab
   * @description adding new password to database
   * @param request
   * @param params
   */
  public async confirmPassword({request }:HttpContextContract){
    const newPassword:string = request.input('password');
    // 7geb el email mn el url
    const email = "haha@gmail.com"
    await User
      .query()
      .where('email', email)
      .update({password:newPassword})
    return {message : "password has been modified"}
  }
}

