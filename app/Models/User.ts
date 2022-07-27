import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import {GetProviderRealUser, OpaqueTokenContract} from "@ioc:Adonis/Addons/Auth";
import Role from "App/Models/Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public role_id:number
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: OpaqueTokenContract<GetProviderRealUser<"user">>

  @column()
  public avatar_url: string;

  @column()
  public providerId: string;

  @column()
  public provider: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

}
