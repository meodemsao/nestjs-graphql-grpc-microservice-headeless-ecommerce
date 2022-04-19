import { Module } from '@nestjs/common'
import { KeycloakGraphqlResolver } from './keycloak.resolver'
import { KcAdminService } from './kcAdmin.service'

@Module({
  providers: [
    KeycloakGraphqlResolver,
    KcAdminService
  ]
})

export class KeycloakGraphqlModule {
}
