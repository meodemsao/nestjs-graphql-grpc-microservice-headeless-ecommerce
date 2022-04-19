import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as KeycloakConnect from 'keycloak-connect'
import {
  KEYCLOAK_CONNECT_OPTIONS,
  KEYCLOAK_INSTANCE,
  KEYCLOAK_LOGGER, META_ENFORCER_OPTIONS,
  META_RESOURCE, META_SCOPES, META_UNPROTECTED,
  NestKeycloakConfig, PolicyEnforcementMode
} from 'nest-keycloak-connect'
import { extractRequest, parseToken } from 'nest-keycloak-connect/util'
import * as querystring from 'querystring'
import Axios, { AxiosRequestConfig } from 'axios'

const http = require('http')

enum ResponseMode {
  permissions = 'permissions',
  decision = 'decision',
  tokens = 'tokens'
}

/**
 * This adds a resource guard, which is policy enforcement by default is permissive.
 * Only controllers annotated with `@Resource` and methods with `@Scopes`
 * are handled by this guard.
 */
@Injectable()
export class CustomResourceGuard implements CanActivate {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloak: KeycloakConnect.Keycloak,
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    private keycloakOpts: NestKeycloakConfig,
    @Inject(KEYCLOAK_LOGGER)
    private logger: Logger,
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resource = this.reflector.get<string>(
      META_RESOURCE,
      context.getClass()
    )
    const scopes = this.reflector.get<string[]>(
      META_SCOPES,
      context.getHandler()
    )
    const isUnprotected = this.reflector.getAllAndOverride<boolean>(
      META_UNPROTECTED,
      [context.getClass(), context.getHandler()]
    )
    const enforcerOpts = this.reflector.getAllAndOverride<KeycloakConnect.EnforcerOptions>(META_ENFORCER_OPTIONS, [context.getClass(), context.getHandler()])

    // Default to permissive
    const pem =
      this.keycloakOpts.policyEnforcement || PolicyEnforcementMode.PERMISSIVE
    const shouldAllow = pem === PolicyEnforcementMode.PERMISSIVE

    // No resource given, check policy enforcement mode
    if (!resource) {
      if (shouldAllow) {
        this.logger.verbose(
          `Controller has no @Resource defined, request allowed due to policy enforcement`
        )
      } else {
        this.logger.verbose(
          `Controller has no @Resource defined, request denied due to policy enforcement`
        )
      }
      return shouldAllow
    }

    // No scopes given, check policy enforcement mode
    if (!scopes) {
      if (shouldAllow) {
        this.logger.verbose(
          `Route has no @Scope defined, request allowed due to policy enforcement`
        )
      } else {
        this.logger.verbose(
          `Route has no @Scope defined, request denied due to policy enforcement`
        )
      }
      return shouldAllow
    }

    this.logger.verbose(
      `Protecting resource [ ${resource} ] with scopes: [ ${scopes} ]`
    )

    // Build permissions
    const permissions = scopes.map(scope => `${resource}:${scope}`)
    // Extract request/response
    const [request, response] = extractRequest(context)

    if (!request.user && isUnprotected) {
      this.logger.verbose(`Route has no user, and is public, allowed`)
      return true
    }

    const user = request.user?.preferred_username ?? 'user'

    const enforcerFn = createEnforcerContext(request, response, enforcerOpts)
    const isAllowed = await enforcerFn(this.keycloak, this.logger, permissions)

    // If statement for verbose logging only
    if (!isAllowed) {
      this.logger.verbose(`Resource [ ${resource} ] denied to [ ${user} ]`)
    } else {
      this.logger.verbose(`Resource [ ${resource} ] granted to [ ${user} ]`)
    }

    return isAllowed
  }
}

const createEnforcerContext = (
  request: any,
  response: any,
  options?: KeycloakConnect.EnforcerOptions
) => (keycloak: KeycloakConnect.Keycloak, logger: Logger, permissions: string[]) =>
  new Promise<boolean>((resolve, _) =>
    enforcer({
      keycloak,
      logger,
      expectedPermissions: permissions,
      options
    })(request, response, (_: any) => {
      if (request.resourceDenied) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  )

const enforcer = (
  { keycloak, logger, expectedPermissions, options }: {
    keycloak: KeycloakConnect.Keycloak,
    logger: Logger,
    expectedPermissions: string[],
    options: any
  }
) => {

  const config = options || {}

  if (!config.response_mode) {
    config.response_mode = ResponseMode.permissions
  }

  if (!config.resource_server_id) {
    // @ts-ignore
    config.resource_server_id = keycloak.getConfig().clientId
  }

  if (typeof expectedPermissions === 'string') {
    expectedPermissions = [expectedPermissions]
  }

  return function (request, response, next) {
    if (!expectedPermissions || expectedPermissions.length === 0) {
      return next()
    }

    let authzRequest: any = {
      audience: config.resource_server_id,
      response_mode: config.response_mode,
      permissions: []
    }

    if (request.kauth && request.kauth.grant) {
      if (handlePermissions(expectedPermissions, function (resource, scope) {
        if (!request.kauth.grant.access_token.hasPermission(resource, scope)) {
          return false
        }
      })) {
        return next()
      }
    }

    if (config.claims) {
      const claims = config.claims(request)

      if (claims) {
        authzRequest.claim_token = Buffer.from(JSON.stringify(claims)).toString('base64')
        authzRequest.claim_token_format = 'urn:ietf:params:oauth:token-type:jwt'
      }
    }

    try {
      if (authzRequest.response_mode === ResponseMode.tokens) {
        authzRequest.response_mode = undefined
      }
      checkPermissions({
        authzRequest,
        request,
        kcConfig: keycloak.getConfig(),
        callback: (permissions) => {
          if (handlePermissions(expectedPermissions, function (resource, scope) {
            if (!permissions || permissions.length === 0) {
              return false
            }

            for (let j = 0; j < permissions.length; j++) {
              let permission = permissions[j]

              if (permission.rsid === resource || permission.rsname === resource) {
                if (scope) {
                  if (permission.scopes && permission.scopes.length > 0) {
                    if (!permission.scopes.includes(scope)) {
                      return false
                    }
                    break
                  }
                  return false
                }
              }
            }
          })) {
            request.permissions = permissions
            return next()
          }
          // @ts-ignore
          return keycloak.accessDenied(request, response, next)
        },
        errorCallback: (err) => {
          logger.verbose(err.message)
          // @ts-ignore
          return keycloak.accessDenied(request, response, next)
        }
      })
    } catch (e) {
      // @ts-ignore
      return keycloak.accessDenied(request, response, next)
    }
  }
}

const handlePermissions = (permissions, callback) => {
  for (let i = 0; i < permissions.length; i++) {
    const expected = permissions[i].split(':')
    const resource = expected[0]
    let scope

    if (expected.length > 1) {
      scope = expected[1]
    }

    let r = callback(resource, scope)

    if (r === false) {
      return r
    }
  }

  return true
}

const checkPermissions = (
  {
    authzRequest,
    kcConfig,
    request,
    callback,
    errorCallback
  }) => {

  const params = new URLSearchParams()
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket')

  if (authzRequest.audience) {
    params.append('audience', authzRequest.audience)
  } else {
    params.append('audience', kcConfig.clientId)
  }


  if (authzRequest.claim_token) {
    params.append('claim_token', authzRequest.claim_token)
    params.append('claim_token_format', authzRequest.claim_token_format)
  }

  const options = postOptions(kcConfig, null)

  if (kcConfig.public) {
    if (request.accessTokenJWT) {
      options.headers.Authorization = 'Bearer ' + request.accessTokenJWT
    }
  } else {
    let header = request.headers.authorization
    let bearerToken

    if (header && (header.indexOf('bearer ') === 0 || header.indexOf('Bearer ') === 0)) {
      bearerToken = header.substring(7)
    }

    if (!bearerToken) {
      if (request.accessTokenJWT) {
        bearerToken = request.accessTokenJWT
      } else {
        return Promise.reject(new Error('No bearer in header'))
      }
    }

    params.append('subject_token', bearerToken)

    if (authzRequest.response_mode) {
      params.append('response_mode', authzRequest.response_mode)
    } else {
      params.append('authorization', `Bearer ${bearerToken}`)
    }
  }

  let permissions = authzRequest.permissions

  if (!permissions) {
    permissions = []
  }

  for (let i = 0; i < permissions.length; i++) {
    const resource = permissions[i]
    let permission = resource.id

    if (resource.scopes && resource.scopes.length > 0) {
      permission += '#'

      for (let j = 0; j < resource.scopes.length; j++) {
        const scope = resource.scopes[j]
        if (permission.indexOf('#') !== permission.length - 1) {
          permission += ','
        }
        permission += scope
      }
    }
    params.append('permission', JSON.stringify(permission))
  }

  const handler = (resolve, reject, json) => {
    try {
      const data = JSON.parse(json)
      if (authzRequest.response_mode === ResponseMode.decision || authzRequest.response_mode === ResponseMode.permissions) {
        callback(data)
      } else {
        const content: any = parseToken(data.access_token)
        const permissions = content.authorization ? content.authorization.permissions : undefined
        callback(permissions)
      }
    } catch (err) {
      console.log('err.............', err.response)
      reject(err)
    }
  }

  return nodeify(fetch(handler, options, params), (result) => result ? errorCallback(result) : null)
}

const fetch = (handler, options, params) => {
  return new Promise(async (resolve, reject) => {
    const content = (typeof params === 'string' ? params : querystring.stringify(params))
    options.headers['Content-Length'] = content.length

    const requester = Axios.create(options)

    requester.post('', params).then((response) => {
      const { data } = response
      handler(resolve, reject, JSON.stringify(data))
    }).catch((err) => {
      return reject(new Error('User permission: ' + err.response.status + ':' + http.STATUS_CODES[err.response.status]))
    })
  })
}
const nodeify = (promise, cb?: any) => {
  if (typeof cb !== 'function') return promise
  return promise.then((res) => cb(null, res)).catch((err) => cb(err))
}

const postOptions = (manager, path): any => {
  const realPath = path || '/protocol/openid-connect/token'
  const opts: AxiosRequestConfig = {
    baseURL: manager.realmUrl + realPath
  }
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Client': 'sgc'
  }
  if (!manager.public) {
    opts.headers.Authorization = 'Basic ' + Buffer.from(manager.clientId + ':' + manager.secret).toString('base64')
  }
  opts.method = 'POST'
  return opts
}