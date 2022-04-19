import { Field, ObjectType } from '@nestjs/graphql'
// import { DecisionStrategy, Logic } from 'constants/enum'
import { KeycloakScopeDTO } from './keycloakScope.dto'
import { KeycloakResourceDTO } from './keycloakResource.dto'


@ObjectType('KeycloakRoleDTO')
export class KeycloakRoleDTO {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  required: boolean
}


@ObjectType('KeycloakPolicyConfigDTO')
export class KeycloakPolicyConfigDTO {
  @Field(() => [KeycloakRoleDTO], { nullable: true })
  roles: KeycloakRoleDTO[]
}


@ObjectType('KeycloakPolicyDTO')
export class KeycloakPolicyDto {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  type: string

  // @Field(() => Logic, { nullable: true })
  // logic: Logic

  // @Field(() => DecisionStrategy, { nullable: true })
  // decisionStrategy: DecisionStrategy

  @Field(() => [KeycloakScopeDTO], { nullable: true })
  scopes: KeycloakScopeDTO[]

  @Field(() => [KeycloakResourceDTO], { nullable: true })
  resources: KeycloakResourceDTO[]

  // @Field(() => KeycloakPolicyConfigDTO, { nullable: true })
  // config: KeycloakPolicyConfigDTO
}