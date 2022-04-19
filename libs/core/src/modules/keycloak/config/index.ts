import {
  KEYCLOAK_BASE_URL,
  KEYCLOAK_CLIENT_GRAPHQL,
  KEYCLOAK_GRAPHQL_CLIENT_SECRET,
  KEYCLOAK_REALM
} from '@vg/core/constants'
import { KeycloakConnectOptions, PolicyEnforcementMode } from 'nest-keycloak-connect'

export const keyCloakConfig: KeycloakConnectOptions = {
  'auth-server-url': KEYCLOAK_BASE_URL,
  realm: KEYCLOAK_REALM,
  secret: KEYCLOAK_GRAPHQL_CLIENT_SECRET,
  clientId: KEYCLOAK_CLIENT_GRAPHQL,
  policyEnforcement: PolicyEnforcementMode.PERMISSIVE

}

