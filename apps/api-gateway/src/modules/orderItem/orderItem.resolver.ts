import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  OrderItemFilterArgs,
  OrderItemInputType,
  CreateOrderItemInput,
  DeleteOrderItemInput,
  UpdateOrderItemInput
} from '@vg/api-gateway/modules/orderItem/dto/orderItem.args'
import { OrderItemDto } from '@vg/api-gateway/modules/orderItem/dto/orderItem.dto'
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

@Resolver(() => OrderItemDto)
@Resource('OrderItem')
@UseInterceptors(AuthorizerInterceptor(OrderItemDto))
export class OrderItemResolver {
  @Query(() => OrderItemDto, { nullable: true })
  @Public()
  async orderItem(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<OrderItemDto>
  ): Promise<OrderItemDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.cart.svc
      .orderItem(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [OrderItemDto])
  @Public()
  async orderItems(
    @Context() context: GqlContext,
    @Args() args: OrderItemFilterArgs
  ): Promise<OrderItemDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.cart.svc
      .orderItems(
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

    return categories.orderItems ?? []
  }

  @Query(() => Int)
  @Public()
  async orderItemsTotal(
    @Context() context: GqlContext,
    @Args() args: OrderItemFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.cart.svc
      .orderItemsTotal(
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
  @Mutation(() => OrderItemDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, OrderItemInputType)
  )
  async createOrderItem(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateOrderItemInput
  ): Promise<OrderItemDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createOrderItem({ data: input?.orderItem }, grpcContext)
      .toPromise()
  }

  @Mutation(() => OrderItemDto, { nullable: true })
  @Public()
  async updateOrderItem(
    @Context() context: GqlContext,
    @Args() { input }: UpdateOrderItemInput
  ): Promise<OrderItemDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.cart.svc
      .updateOrderItem(
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

  @Mutation(() => OrderItemDto, { nullable: true })
  @Public()
  async deleteOrderItem(
    @Context() context: GqlContext,
    @Args() { input }: DeleteOrderItemInput
  ): Promise<OrderItemDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.cart.svc
      .deleteOrderItem(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
