import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GrpcUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToRpc().getContext().user
})