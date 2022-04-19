import {  Query, Resolver } from '@nestjs/graphql'
import { KcAdminService } from './kcAdmin.service'
import { KeycloakPolicyDto } from './dto/keycloakPolicy.dto'

@Resolver()
export class KeycloakGraphqlResolver {

  constructor(
    private readonly kcAdmin: KcAdminService
  ) {
  }

  @Query(() => [KeycloakPolicyDto])
  async findAllPermission(): Promise<KeycloakPolicyDto[]> {
    return await this.kcAdmin.findAllPermission()
  }
}