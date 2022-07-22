// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Pet from "App/Models/Pet";

export default class PetsController {

  /**
   * @author Abdullah Hegab
   * @description Get all information
   * @param response
   */
  public async index({response}: HttpContextContract) {
    const pets = await Pet.all();
    if (pets.length > 0) {
      response.status(200)
      return {
        data: pets
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
    const body = request.body();
    const addPet = Pet.create(body);
    response.status(200);
    return addPet;
  }

  /**
   * @author Abdullah Hegab
   * @description get object by id
   * @param params
   * @param response
   */
  public async show({params, response}: HttpContextContract) {
    const db_pet = await Pet.find(params.id);
    if (db_pet) {
      response.status(200);
      return {
        data: db_pet
      };
    } else {
      response.status(404);
      return {
        message: "object not found"
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
    const body = request.body();
    const pet = await Pet.find(params.id)
    if (pet) {
      response.status(200)
      pet.type = body.type || pet.type;
      pet.name = body.name || pet.name;
      pet.age = body.age || pet.age;
      const createdObject = await pet.save();
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
    const pet = await Pet.find(params.id);
    if (pet) {
      response.status(200);
      await pet.delete();
      return {
        message: "object has been deleted successfully",
      };
    } else {
      response.status(404);
      return {
        message: "object not found"
      }
    }
  }
}
