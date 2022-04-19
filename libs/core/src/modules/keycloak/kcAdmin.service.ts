import { default as KeycloakAdminClient } from '@keycloak/keycloak-admin-client'
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'
import { Injectable } from '@nestjs/common'
import { Issuer } from 'openid-client'

import {
  KEYCLOAK_CLIENT_ECOMMERCE,
  KEYCLOAK_ADMIN_PASSWORD,
  KEYCLOAK_ADMIN_USERNAME,
  KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_GRAPHQL,
  KEYCLOAK_GRAPHQL_CLIENT_ID,
  MAX_SIZE_KEYCLOAK,
  KEYCLOAK_POLICY_RESOURCE,
  KEYCLOAK_POLICY_SCOPE
} from '@vg/core/constants'
import {
  KeycloakResourceDTO
} from './dto/keycloakResource.dto'
import { KeycloakScopeDTO } from './dto/keycloakScope.dto'
import { KcUserDto } from './dto/keycloakUser.dto'
import { KcAuthDTO } from './dto/keycloakAuth.dto'
import { KeycloakPolicyDto } from './dto/keycloakPolicy.dto'
import { CreateKeycloakInput } from './dto/keycloakPermission.dto'

@Injectable()
export class KcAdminService {
  private kcAdmin: KeycloakAdminClient

  constructor() {
    this.kcAdmin = new KeycloakAdminClient({
      baseUrl: KEYCLOAK_BASE_URL
    })
    this.kcAdmin
      .auth({
        username: KEYCLOAK_ADMIN_USERNAME,
        password: KEYCLOAK_ADMIN_PASSWORD,
        grantType: 'password',
        clientId: 'admin-cli'
      })
      .then(() => {
        this.kcAdmin.setConfig({
          realmName: KEYCLOAK_REALM
        })
      })
      .catch((error) => console.log('error auth admin keycloak...', error))
  }

  protected async getAccessTokenRealm(
    {
      realm,
      clientId,
      redirectUris,
      responseTypes
    }: {
      realm?: string
      clientId?: string
      redirectUris?: string[]
      responseTypes?: any
    }) {
    const keycloakIssuer = await Issuer.discover(
      `${KEYCLOAK_BASE_URL}/realms/${realm ?? 'master'}`
    )
    return new keycloakIssuer.Client({
      client_id: clientId ?? 'admin-cli', // Same as `clientId` passed to client.auth()
      token_endpoint_auth_method: 'none', // to send only client_id in the header
      redirect_uris: redirectUris,
      response_types: responseTypes
    })
  }

  protected async getAccessTokenAdmin() {
    const client = await this.getAccessTokenRealm({})
    let tokenSet = await client.grant({
      grant_type: 'password',
      username: KEYCLOAK_ADMIN_USERNAME,
      password: KEYCLOAK_ADMIN_PASSWORD
    })
    const refreshToken = tokenSet.refresh_token
    tokenSet = await client.refresh(refreshToken)
    return tokenSet.access_token
  }


  /**
   * create user
   * @param email
   * @param username
   * @param lastName
   * @param firstName
   * @param password
   */
  async createUser(
    {
      email,
      username,
      lastName,
      firstName,
      password
    }): Promise<string> {
    try {
      await this.setAccessTokenAdmin()

      const { id } = await this.kcAdmin.users.create({
        email: email,
        enabled: true,
        username: username,
        lastName: lastName,
        firstName: firstName
      })

      await this.kcAdmin.users.resetPassword({
        id: id,
        credential: {
          temporary: false,
          value: password
        }
      })

      return id
    } catch (e) {
      console.log('e..................', e)
      throw new Error(e)
    }
  }

  /**
   * Create default role
   * @param roleName
   * @param userId
   */
  async creatDefaultRole(roleName, userId): Promise<void> {
    // get access token
    await this.setAccessTokenAdmin()
    // get role
    //console.log('roleName..............', roleName)
    const role = await this.kcAdmin.clients.findRole({
      roleName: roleName,
      id: KEYCLOAK_GRAPHQL_CLIENT_ID
    })

    ///console.log('role..............', role, userId)

    if (role) {
      // add user with role
      await this.kcAdmin.users.addClientRoleMappings({
        id: userId,
        clientUniqueId: KEYCLOAK_GRAPHQL_CLIENT_ID,
        roles: [
          {
            // clientRole: true,
            containerId: KEYCLOAK_GRAPHQL_CLIENT_ID,
            // description: 'Admin',
            id: role.id,
            name: role.name
          }
        ]
      })
    }
  }

  /**
   * find user by user name
   * @param username
   * @param search
   * @param max
   * @param email
   * @param first
   */
  async findUsers(
    {
      username,
      search,
      max,
      email,
      first
    }: {
      username?: string | undefined
      search?: string | undefined
      max?: number | undefined
      first?: number | undefined
      email?: string | undefined
    }): Promise<KcUserDto[]> {
    await this.setAccessTokenAdmin()
    // find users
    const users = await this.kcAdmin.users.find({
      username,
      email,
      search,
      max,
      first
    })
    // map user to DTO
    return users?.map((user) => (user as unknown) as KcUserDto) ?? []
  }

  async findUser({ username }: { username: string }): Promise<KcUserDto> {
    await this.setAccessTokenAdmin()
    // find users
    const users = await this.kcAdmin.users.find({
      username,
      max: 1
    })
    // map user to DTO
    return users && users.length > 0
      ? ((users[0] as unknown) as KcUserDto)
      : null
  }


  /**
   * find all permission
   */
  async findAllPermission(): Promise<KeycloakPolicyDto[]> {
    try {
      await this.setAccessTokenAdmin()

      const policyRepresentations = await this.kcAdmin.clients.findPermissions({
        name: null,
        id: KEYCLOAK_GRAPHQL_CLIENT_ID,
        realm: KEYCLOAK_REALM
      })

      const permissions = []

      await Promise.all(
        policyRepresentations.map(async (policyRepresentation) => {
          const perm = await this.findOnePermission({
            id: policyRepresentation.id,
            type: policyRepresentation.type
          })

          if (perm) {
            permissions.push(perm)
          }
        })
      )
      return permissions
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * find one permission
   * @param id
   * @param type
   * @param name
   */
  async findOnePermission(
    {
      id,
      type,
      name
    }: {
      id?: string
      type?: string
      name?: string
    }): Promise<KeycloakPolicyDto> {
    try {
      await this.kcAdmin.getAccessToken()

      let policyRepresentation = null

      if (id) {
        policyRepresentation = await this.kcAdmin.clients.findOnePermission({
          id: KEYCLOAK_GRAPHQL_CLIENT_ID,
          realm: KEYCLOAK_REALM,
          type,
          permissionId: id
        })
      } else if (name) {
        policyRepresentation = await this.kcAdmin.clients.findPolicyByName({
          id: KEYCLOAK_GRAPHQL_CLIENT_ID,
          realm: KEYCLOAK_REALM,
          name: name
        })
      }

      if (!policyRepresentation) return null

      const resources = await this.findPolicyResource(policyRepresentation.id)
      const scopes = await this.findPolicyScope(policyRepresentation.id)

      const permission = (policyRepresentation as unknown) as KeycloakPolicyDto

      permission.resources = resources
      permission.scopes = scopes

      return permission
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Create permission scope
   * @param input
   */
  async createPermissionScope(
    input: CreateKeycloakInput
  ): Promise<KeycloakPolicyDto> {
    try {
      await this.kcAdmin.getAccessToken()

      const permission = await this.findOnePermission({
        name: input.name
      })
      if (permission) return permission

      await this.kcAdmin.clients.createPermission(
        {
          id: KEYCLOAK_GRAPHQL_CLIENT_ID,
          type: input.type
        },
        {
          name: input.name,
          logic: input.logic,
          decisionStrategy: input.decisionStrategy,
          resources: input.resources,
          scopes: input.scopes,
          description: input.description
        }
      )
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * find policy by resource
   * @param id
   */
  async findPolicyResource(id: string): Promise<KeycloakResourceDTO[]> {
    try {
      await this.setAccessTokenAdmin()

      const requestResource = this.kcAdmin.clients.makeRequest<{ clientId: string; id: string },
        void>({
        method: 'get',
        path: KEYCLOAK_POLICY_RESOURCE,
        urlParamKeys: ['clientId', 'id']
      })

      const resource = await requestResource({
        id,
        clientId: KEYCLOAK_GRAPHQL_CLIENT_ID
      })

      return (resource as unknown) as KeycloakResourceDTO[]
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * find policy by scope
   * @param id
   */
  async findPolicyScope(id: string): Promise<KeycloakScopeDTO[]> {
    try {
      await this.setAccessTokenAdmin()

      const requestResource = this.kcAdmin.clients.makeRequest<{ clientId: string; id: string },
        void>({
        method: 'get',
        path: KEYCLOAK_POLICY_SCOPE,
        urlParamKeys: ['clientId', 'id']
      })

      const scopes = await requestResource({
        id,
        clientId: KEYCLOAK_GRAPHQL_CLIENT_ID
      })

      return (scopes as unknown) as KeycloakScopeDTO[]
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * login keycloak from admin
   * @param username
   * @param pass
   */
  async loginAdminKeycloak(username: string, pass: string): Promise<KcAuthDTO> {
    const client = await this.getAccessTokenRealm({
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT_ECOMMERCE,
      responseTypes: ['code']
    })

    // return login with
    const auth = await client
      .grant({
        grant_type: 'password',
        username: username,
        password: pass,
        scope: 'openid profile email'
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.log('e.................', e.message)
        return null
      })

    if (!auth) return null

    return {
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
      expiresIn: auth.expires_in ? Number(auth.expires_in) : 0,
      refreshExpiresIn: auth.refresh_expires_in
        ? Number(auth.refresh_expires_in)
        : 0,
      idToken: auth.id_token
    }
  }


  async getAllUserWithRole(
    {
      roleId,
      roleName
    }: {
      roleId?: string
      roleName?: string
    }): Promise<KcUserDto[]> {
    try {
      await this.setAccessTokenAdmin()

      const listUsers: UserRepresentation[] = []

      // get group by role
      const groups = await this.kcAdmin.groups.find({})
      if (groups?.length > 0) {
        for (let index = 0; index < groups.length; index++) {
          const group = groups[index]
          const roles = await this.kcAdmin.groups.listRoleMappings({
            id: group.id
          })

          if (
            roles?.clientMappings &&
            roles.clientMappings[KEYCLOAK_CLIENT_GRAPHQL]
          ) {
            const { mappings } = roles.clientMappings[KEYCLOAK_CLIENT_GRAPHQL]
            if (
              mappings?.length > 0 &&
              mappings.find((r: any) => r.name === roleName)
            ) {
              // roleGroups.push(group)
              const users = await this.kcAdmin.groups.listMembers({
                id: group.id,
                max: MAX_SIZE_KEYCLOAK
              })

              if (users?.length > 0) {
                listUsers.push(
                  ...users.filter((u) =>
                    listUsers.every((user) => user.id !== u.id)
                  )
                )
              }
            }
          }
        }
      }

      const role = await this.kcAdmin.clients.findRole({
        id: KEYCLOAK_GRAPHQL_CLIENT_ID,
        roleName: roleName
      })

      if (!role) throw new Error('')

      let clause = {
        id: KEYCLOAK_GRAPHQL_CLIENT_ID,
        roleName: role.name,
        max: MAX_SIZE_KEYCLOAK
      }

      const userRoles = await this.kcAdmin.clients.findUsersWithRole(clause)

      if (userRoles.length > 0) {
        listUsers.push(
          ...userRoles.filter((u) =>
            listUsers.every((user) => user.id !== u.id)
          )
        )
      }

      return listUsers.map((user) => {
        return (user as unknown) as KcUserDto
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async countTotalUser() {
    try {
      return await this.kcAdmin.users.count({
        max: 10000,
        realm: KEYCLOAK_CLIENT_GRAPHQL
      })
    } catch (e) {
      console.log('e........', e)
    }
  }

  /**
   * set access token
   */
  async setAccessTokenAdmin() {
    // get token
    const accessToken = await this.getAccessTokenAdmin()
    // set access token
    await this.kcAdmin.setAccessToken(accessToken)
  }
}
