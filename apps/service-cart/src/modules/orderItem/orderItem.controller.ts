import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  OrderItem,
  OrderItems,
  CreateOrderItemInput,
  UpdateOrderItemInput
} from '@vg/proto-schema'
import {
  GetOrderItemQuery,
  GetOrderItemsQuery,
  GetOrderItemsTotalQuery
} from '@vg/service-cart/modules/orderItem/queries'
import {
  CreateOrderItemCommand,
  DeleteOrderItemCommand,
  UpdateOrderItemCommand
} from '@vg/service-cart/modules/orderItem/commands'

@Controller()
export class OrderItemController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'orderItem')
  @Public()
  async orderItem(request: Id, ctx: any): Promise<OrderItem> {
    try {
      return this.queryBus.execute(new GetOrderItemQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * carts
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.cart.service, 'orderItems')
  @Public()
  async orderItems(request: Query, ctx: any): Promise<OrderItems> {
    try {
      return this.queryBus.execute(new GetOrderItemsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'orderItemsTotal')
  @Public()
  async orderItemsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetOrderItemsTotalQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create cart
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'createOrderItem')
  async createOrderItem(
    request: CreateOrderItemInput,
    ctx: any
  ): Promise<OrderItem> {
    try {
      return await this.commandBus.execute(new CreateOrderItemCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateOrderItem')
  async updateOrderItem(
    request: UpdateOrderItemInput,
    ctx: any
  ): Promise<OrderItem> {
    try {
      return await this.commandBus.execute(new UpdateOrderItemCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteOrderItem')
  async deleteOrderItem(request: Id, ctx: any): Promise<OrderItem> {
    try {
      return await this.commandBus.execute(new DeleteOrderItemCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
