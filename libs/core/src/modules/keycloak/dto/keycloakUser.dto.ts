import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('KcUserDto')
export class KcUserDto {
  @Field()
  id: string

  @Field()
  username: string

  @Field({nullable: true})
  firstName: string

  @Field({nullable: true})
  lastName: string

  @Field({nullable: true})
  fullName: string

  @Field({nullable: true})
  email: string
}