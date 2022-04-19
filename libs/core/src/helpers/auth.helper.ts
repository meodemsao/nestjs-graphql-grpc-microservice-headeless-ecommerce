import { parseToken } from 'nest-keycloak-connect/util'

const extractJwt = (headers: { [key: string]: string }) => {
  if (headers && !headers.authorization) {
    return null
  }

  const auth = headers.authorization?.split(' ') ?? []

  if (auth[0].toLowerCase() !== 'bearer') {
    return null
  }

  return auth[1]
}

export const getUserName = (context: any): any => {
  const token = extractJwt(context.req?.headers)
  return token ? parseToken(token) : null
}