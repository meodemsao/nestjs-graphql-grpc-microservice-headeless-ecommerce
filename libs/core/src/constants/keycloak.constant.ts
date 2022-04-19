// KEYCLOAK
export const KEYCLOAK_REALM: string = process.env.KEYCLOAK_REALM || 'system'
export const KEYCLOAK_BASE_URL: string =
  process.env.KEYCLOAK_BASE_URL || 'system'
export const KEYCLOAK_CLIENT_GRAPHQL: string =
  process.env.KEYCLOAK_CLIENT_GRAPHQL || 'system'
export const KEYCLOAK_CLIENT_ECOMMERCE: string =
  process.env.KEYCLOAK_CLIENT_ECOMMERCE || 'system'
export const KEYCLOAK_ADMIN_USERNAME: string =
  process.env.KEYCLOAK_ADMIN_USERNAME || 'admin'
export const KEYCLOAK_ADMIN_PASSWORD: string =
  process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin'
export const KEYCLOAK_GRAPHQL_CLIENT_ID: string =
  process.env.KEYCLOAK_GRAPHQL_CLIENT_ID || 'system'
export const KEYCLOAK_GRAPHQL_CLIENT_SECRET: string =
  process.env.KEYCLOAK_GRAPHQL_CLIENT_SECRET || 'system'

// base scope
export const BASE_KEYCLOAK_SCOPE = {
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
}

// path call api keycloak
export const KEYCLOAK_POLICY_RESOURCE = '{clientId}/authz/resource-server/policy/{id}/resources'
export const KEYCLOAK_POLICY_SCOPE = '{clientId}/authz/resource-server/policy/{id}/scopes'
export const KEYCLOAK_ALL_POLICY = '{clientId}/authz/resource-server/policy?first={first}&max={max}&permission=false'
export const KEYCLOAK_POLICY_PERMISSION = '{clientId}/authz/resource-server/policy/{permissionId}/associatedPolicies'
export const KEYCLOAK_FIND_PERMISSIONS = `{clientId}/authz/resource-server/permission?first={first}&max={max}&name={name}`
export const KEYCLOAK_CHANGE_PASSWORD = 'account/credentials/password'
export const KEYCLOAK_REFRESH_TOKEN = 'protocol/openid-connect/token'
export const KEYCLOAK_DELETE_SCOPE = '{clientId}/authz/resource-server/scope/{scopeId}'
export const KEYCLOAK_FIND_RESOURCE = '{clientId}/authz/resource-server/policy/{permissionId}/resources'

export const MAX_SIZE_KEYCLOAK = 100000
