import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnersController{
  public async index(){
    return "Get pets"
  }

  public async store({request} : HttpContextContract){
    return {
      data: request.body,
      msg : "post pets"
    };
  }

  public async show({params}: HttpContextContract ){
    return "Get one pet"+ params.id;
  }

  public async update({params}: HttpContextContract ){
    return "Put Pet" + params.id;
  }

  public async destroy({params}: HttpContextContract ){
    return "Delete Pet" + params.id;

  }
}
