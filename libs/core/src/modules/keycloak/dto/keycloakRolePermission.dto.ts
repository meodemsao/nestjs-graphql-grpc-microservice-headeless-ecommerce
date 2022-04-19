import { Field, ObjectType } from '@nestjs/graphql'
// import { KcRoleDto } from 'modules/role/dto/kcRole.dto'

@ObjectType('KeycloakRolePermissionDto')
export class KeycloakRolePermissionDto {
  // @Field(() => KcRoleDto)
  // role: KcRoleDto

  @Field(() => [String], { nullable: true })
  permission: String[]
}
