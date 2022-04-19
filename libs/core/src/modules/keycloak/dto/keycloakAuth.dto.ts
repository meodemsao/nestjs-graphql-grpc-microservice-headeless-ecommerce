import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('KcAuthDTO')
export class KcAuthDTO {
  @Field({ nullable: true })
  idToken?: string

  @Field()
  accessToken: string

  @Field()
  refreshToken: string

  @Field()
  expiresIn: number

  @Field()
  refreshExpiresIn: number
}
