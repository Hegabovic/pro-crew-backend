import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {

  /**
   * @author Abdullah Hegab
   * @description Get all information
   * @param response
   */
  public async index({response}: HttpContextContract) {
    const users = await User.query().where('role_id',1)
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
   * @description create new object
   * @param request
   * @param response
   */
  public async store({request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({trim:true}),
      type: schema.string({trim:true}),
      age: schema.number()
    })
    const payload = await request.validate({schema:newUserSchema})
    const addUser = User.create(payload);
    response.status(200);
    return addUser;
  }

  /**
   * @author Abdullah Hegab
   * @description get object by id
   * @param params
   * @param response
   */
  public async show({params, response}: HttpContextContract) {
    const db_user = await User.find(params.id);
    if (db_user) {
      response.status(200);
      return {
        data: db_user
      };
    } else {
      response.status(404);
      return {
        message: "user not found"
      };
    }
  }

  /**
   * @author Abdullah Hegab
   * @description update object by id
   * @param params
   * @param request
   * @param response
   */
  public async update({params, request, response}: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({trim:true}),
      email: schema.string({trim:true}),
    })
    const payload = await request.validate({schema:newUserSchema});
    const user = await User.find(params.id);
    if (user) {
      response.status(200)
      user.name = payload.name || user.name;
      user.email = payload.email || user.email;

      const createdObject = await user.save();
      return {
        message: "object updated successfully",
        data: createdObject
      };
    } else {
      response.status(404)
      return {
        message: "object not found"
      };
    }
  }

  /**
   * @author Abdullah Hegab
   * @description delete object by id
   * @param params
   * @param response
   */
  public async destroy({params, response}: HttpContextContract) {
    const user = await User.find(params.id);
    if (user) {
      response.status(200);
      await user.delete();
      return {
        success: "object has been deleted successfully",
      };
    } else {
      response.status(404);
      return {
        failed: "object not found"
      }
    }
  }
}
