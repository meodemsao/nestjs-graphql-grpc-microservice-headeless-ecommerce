import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as KeycloakConnect from 'keycloak-connect'
import { Metadata } from '@grpc/grpc-js'
import {
  KEYCLOAK_CONNECT_OPTIONS, KEYCLOAK_COOKIE_DEFAULT,
  KEYCLOAK_INSTANCE,
  KEYCLOAK_LOGGER, META_SKIP_AUTH,
  META_UNPROTECTED,
  NestKeycloakConfig, TokenValidation
} from 'nest-keycloak-connect'
import { UnauthorizedRpcException } from '@vg/common'

/**
 * An authentication guard. Will return a 401 unauthorized when it is unable to
 * verify the JWT token or Bearer header is missing.
 */
@Injectable()
export class AuthGrpcGuard implements CanActivate {
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

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext()
  }

  extractRequest(metadata: Metadata): [any] {
    let request: any
    if (metadata) {
      const gmap = metadata.getMap()
      const headers = gmap?.headers ?? null
      const cookies = gmap?.cookies ?? null
      request = {
        headers: headers ? JSON.parse(headers as string) : null,
        cookies
      }
    }

    return [request ?? {}]
  }

  parseToken(token: string): string {
    const parts = token.split('.')
    return JSON.parse(Buffer.from(parts[1], 'base64').toString())
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUnprotected = this.reflector.getAllAndOverride<boolean>(
      META_UNPROTECTED,
      [context.getClass(), context.getHandler()]
    )
    const skipAuth = this.reflector.getAllAndOverride<boolean>(META_SKIP_AUTH, [
      context.getClass(),
      context.getHandler()
    ])

    // If unprotected is set skip Keycloak authentication
    if (isUnprotected && skipAuth) {
      return true
    }


    // Extract request/response
    const grpcContext = context.getType() === 'rpc' ? this.getRequest(context) as Metadata : null

    const [request] = this.extractRequest(grpcContext)

    const jwt =
      this.extractJwtFromCookie(request.cookies) ??
      this.extractJwt(request.headers)
    const isJwtEmpty = jwt === null || jwt === undefined

    // Empty jwt, but skipAuth = false, isUnprotected = true allow fallback
    if (isJwtEmpty && !skipAuth && isUnprotected) {
      this.logger.verbose(
        'Empty JWT, skipAuth disabled, and a publicly marked route, allowed for fallback'
      )
      return true
    }

    // Empty jwt given, immediate return
    if (isJwtEmpty) {
      this.logger.verbose('Empty JWT, unauthorized')
      throw new UnauthorizedRpcException('Unauthorized')
    }

    this.logger.verbose(`User JWT: ${jwt}`)

    const isValidToken = await this.validateToken(jwt)

    if (isValidToken) {
      // Attach user info object
      // @ts-ignore
      grpcContext.user = this.parseToken(jwt)
      // Attach raw access token JWT extracted from bearer/cookie
      // @ts-ignore
      grpcContext.accessTokenJWT = jwt

      this.logger.verbose(
        `Authenticated User: ${JSON.stringify(request.user)}`
      )
      return true
    }
    throw new UnauthorizedRpcException('Unauthorized')
  }

  private async validateToken(jwt: any) {
    const tokenValidation =
      this.keycloakOpts.tokenValidation || TokenValidation.OFFLINE

    const gm = this.keycloak.grantManager
    let grant: KeycloakConnect.Grant

    try {
      grant = await gm.createGrant({ access_token: jwt })
    } catch (ex) {
      this.logger.warn(`Cannot validate access token: ${ex}`)
      // It will fail to create grants on invalid access token (i.e expired or wrong domain)
      return false
    }

    const token = grant.access_token

    this.logger.verbose(
      `Using token validation method: ${tokenValidation.toUpperCase()}`
    )

    try {
      let result: boolean | KeycloakConnect.Token
      switch (tokenValidation) {
        case TokenValidation.ONLINE:
          result = await gm.validateAccessToken(token)
          return result === token
        case TokenValidation.OFFLINE:
          result = await gm.validateToken(token, 'Bearer')
          return result === token
        case TokenValidation.NONE:
          return true
        default:
          this.logger.warn(`Unknown validation method: ${tokenValidation}`)
          return false
      }
    } catch (ex) {
      this.logger.warn(`Cannot validate access token: ${ex}`)
    }

    return false
  }

  private extractJwt(headers: { [key: string]: string }) {
    if (headers && !headers.authorization) {
      this.logger.verbose(`No authorization header`)
      return null
    }

    const auth = headers.authorization.split(' ')

    // We only allow bearer
    if (auth[0].toLowerCase() !== 'bearer') {
      this.logger.verbose(`No bearer header`)
      return null
    }

    return auth[1]
  }

  private extractJwtFromCookie(cookies: { [key: string]: string }) {
    const cookieKey = this.keycloakOpts.cookieKey || KEYCLOAK_COOKIE_DEFAULT
    return cookies && cookies[cookieKey]
  }
}