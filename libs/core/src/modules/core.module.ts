import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { HttpModule } from '@nestjs/axios'
import { KeycloakConnectModule } from 'nest-keycloak-connect'
import { ValidatorService, AppLogger } from '../services'
import { KeycloakGraphqlModule } from './keycloak'
import { KeycloakConfig } from '@vg/core/services/configs/keycloak-config'

@Global()
@Module({
  imports: [
    // HealthModule,
    HttpModule,
    CqrsModule,
    KeycloakConnectModule.registerAsync({
      useClass: KeycloakConfig
    }),
    KeycloakGraphqlModule
  ],
  providers: [
    AppLogger,
    ValidatorService
  ],
  exports: [
    // HealthModule,
    HttpModule,
    CqrsModule,
    AppLogger,
    ValidatorService,
    KeycloakConnectModule.registerAsync({
      useClass: KeycloakConfig
    }),
    KeycloakGraphqlModule
  ]
})

export class CoreModule {
}
