import { Resolver, GqlExecutionContext } from '@nestjs/graphql'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    request.body = ctx.getArgs()
    return request.user
  }
)

@Resolver('App')
export class AppResolver {

}