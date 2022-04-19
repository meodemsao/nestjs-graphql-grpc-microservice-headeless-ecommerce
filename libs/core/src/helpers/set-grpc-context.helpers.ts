import { Metadata } from '@grpc/grpc-js'
import { GqlContext } from '../'

export function setRpcContext(ctx: GqlContext, inApp?: boolean): Metadata {
  const meta = new Metadata()
  // @ts-ignore
  meta.set('headers', JSON.stringify(ctx.req.headers))

  // if (ctx.isAuthenticated()) {
  //   meta.set('user', JSON.stringify(ctx.getUser()));
  // }

  // @ts-ignore
  if (ctx.req.tenantInfo) {
    // @ts-ignore
    meta.set('x-tenant-info', JSON.stringify(ctx.req.tenantInfo))
  }

  if (inApp) {
    meta.set('inApp', inApp.toString())
  }
  return meta
}
