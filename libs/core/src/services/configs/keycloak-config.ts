import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation
} from 'nest-keycloak-connect'
import { Boot, InjectBoot } from '@nestcloud/boot'
import { ConsulKeycloakConfig } from '@vg/common'

export class KeycloakConfig implements KeycloakConnectOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {
  }

  createKeycloakConnectOptions(): Promise<KeycloakConnectOptions> | KeycloakConnectOptions {

    const keycloakConfig = this.boot.get<ConsulKeycloakConfig>('keycloak')
    console.log('keycloakConfig.....', keycloakConfig)
    return {
      'auth-server-url': keycloakConfig?.authServerUrl,
      realm: keycloakConfig?.realm,
      secret: keycloakConfig?.secret,
      clientId: keycloakConfig?.clientId,
      bearerOnly: keycloakConfig?.bearerOnly ?? false,
      public: keycloakConfig?.public ?? false,
      tokenValidation: TokenValidation.OFFLINE,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE
    }
  }
}