// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class PetsController {

  public async index(){
    return "Get pets"
  }

  public async store({request} : HttpContextContract){
    return {
      msg : "post pets",
      data: request.body(),
    };
  }

  public async show({params}: HttpContextContract ){
    return " Get one pet " + params.id;
  }

  public async update({params}: HttpContextContract ){
    return " Put Pet " + params.id;
  }

  public async destroy({params}: HttpContextContract ){
    return " Delete Pet " + params.id;
  }
}
