import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('KeycloakScopeDTO')
export class KeycloakScopeDTO {
  @Field()
  name: string

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  iconUri?: string
}