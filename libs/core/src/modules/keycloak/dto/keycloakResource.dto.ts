import {Field, ObjectType} from '@nestjs/graphql'
import {KeycloakScopeDTO} from './keycloakScope.dto'
import { KeycloakPolicyDto } from './keycloakPolicy.dto'

@ObjectType('KeycloakResourceDTO')
export class KeycloakResourceDTO {
  @Field({nullable: true})
  id?: string

  @Field({nullable: true})
  displayName: string

  @Field({nullable: true})
  name: string

  @Field(() => [String], {nullable: true})
  uris?: string[]

  @Field({nullable: true})
  type?: string

  @Field({nullable: true})
  owner?: string

  @Field({nullable: true})
  ownerManagedAccess?: boolean

  @Field(() => [KeycloakScopeDTO], {nullable: true})
  scopes: KeycloakScopeDTO[]

  @Field(() => [KeycloakScopeDTO], {nullable: true})
  resourceScopes: KeycloakScopeDTO[]
}

@ObjectType('KcResourcePermissionDTO')
export class KcResourcePermissionDTO {
  @Field(() => KeycloakResourceDTO, {nullable: true})
  resource: KeycloakResourceDTO

  @Field(() => [KeycloakPolicyDto], {nullable: true})
  permissions: KeycloakPolicyDto[]
}
