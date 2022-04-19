import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OrderFilterArgs,
  OrderInputType,
  CreateOrderInput,
  DeleteOrderInput,
  UpdateOrderInput
} from '@vg/api-gateway/modules/order/dto/order.args'
import { OrderDto } from '@vg/api-gateway/modules/order/dto/order.dto'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { Public, Resource } from 'nest-keycloak-connect'

@Resolver(() => OrderDto)
@Resource('Order')
@UseInterceptors(AuthorizerInterceptor(OrderDto))
export class OrderResolver {
  @Query(() => OrderDto, { nullable: true })
  @Public()
  async order(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<OrderDto>
  ): Promise<OrderDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.cart.svc
      .order(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [OrderDto])
  @Public()
  async orders(
    @Context() context: GqlContext,
    @Args() args: OrderFilterArgs
  ): Promise<OrderDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.cart.svc
      .orders(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          // @ts-ignore
          paging: args?.paging,
          // @ts-ignore
          sorting: args?.sorting
        },
        grpcContext
      )
      .toPromise()

    return categories.orders ?? []
  }

  @Query(() => Int)
  @Public()
  async ordersTotal(
    @Context() context: GqlContext,
    @Args() args: OrderFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.cart.svc
      .ordersTotal(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          paging: undefined,
          sorting: undefined
        },
        grpcContext
      )
      .toPromise()

    return result.totalCount ?? 0
  }

  @Public()
  @Mutation(() => OrderDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, OrderInputType))
  async createOrder(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateOrderInput
  ): Promise<OrderDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.cart.svc
      // @ts-ignore
      .createOrder({ data: input?.order }, grpcContext)
      .toPromise()
  }

  @Mutation(() => OrderDto, { nullable: true })
  @Public()
  async updateOrder(
    @Context() context: GqlContext,
    @Args() { input }: UpdateOrderInput
  ): Promise<OrderDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.cart.svc
      .updateOrder(
        {
          // @ts-ignore
          id: input.id,
          // @ts-ignore
          data: input.update
        },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => OrderDto, { nullable: true })
  @Public()
  async deleteOrder(
    @Context() context: GqlContext,
    @Args() { input }: DeleteOrderInput
  ): Promise<OrderDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.cart.svc
      .deleteOrder(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
