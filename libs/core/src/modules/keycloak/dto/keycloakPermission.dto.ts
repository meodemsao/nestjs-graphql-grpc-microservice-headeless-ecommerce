import { Field, ObjectType } from '@nestjs/graphql'
import { KeycloakScopeDTO } from './keycloakScope.dto'
import { KeycloakResourceDTO } from './keycloakResource.dto'
import { KeycloakPolicyDto } from './keycloakPolicy.dto'
import { DecisionStrategy, Logic } from '@keycloak/keycloak-admin-client/lib/defs/policyRepresentation'

export class CreateKeycloakInput {

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description: string

  @Field(() => String)
  type: string

  @Field(() => Logic)
  logic: Logic

  @Field(() => DecisionStrategy)
  decisionStrategy: DecisionStrategy

  @Field(() => [String])
  resources: string[]

  @Field(() => [String])
  scopes: string[]
}


@ObjectType('KeycloakPermissionDTO')
export class KeycloakPermissionDTO {
  @Field(() => [KeycloakScopeDTO], { nullable: true })
  allowedScopes: KeycloakScopeDTO[]

  @Field(() => KeycloakResourceDTO, { nullable: true })
  resource: KeycloakResourceDTO

  @Field(() => [KeycloakScopeDTO], { nullable: true })
  scopes: KeycloakScopeDTO[]

  @Field(() => [KeycloakPolicyDto], { nullable: true })
  policies: KeycloakPolicyDto[]

  @Field(() => String, { nullable: true })
  status: string
}