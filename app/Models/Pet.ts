import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pet extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public type:string;

  @column()
  public name:string;

  @column()
  public age:number;

  @column.dateTime({ autoCreate: true , serialize: (value:DateTime) => value.toFormat('dd LLL yyyy')  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true , serialize: (value:DateTime) => value.toFormat('dd LLL yyyy') })
  public updatedAt: DateTime
}
