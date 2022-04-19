import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Order,
  Orders,
  CreateOrderInput,
  UpdateOrderInput
} from '@vg/proto-schema'
import {
  GetOrderQuery,
  GetOrdersQuery,
  GetOrdersTotalQuery
} from '@vg/service-cart/modules/order/queries'
import {
  CreateOrderCommand,
  DeleteOrderCommand,
  UpdateOrderCommand
} from '@vg/service-cart/modules/order/commands'

@Controller()
export class OrderController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'order')
  @Public()
  async order(request: Id, ctx: any): Promise<Order> {
    try {
      return this.queryBus.execute(new GetOrderQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'orders')
  @Public()
  async orders(request: Query, ctx: any): Promise<Orders> {
    try {
      return this.queryBus.execute(new GetOrdersQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'ordersTotal')
  @Public()
  async ordersTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetOrdersTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createOrder')
  async createOrder(request: CreateOrderInput, ctx: any): Promise<Order> {
    try {
      return await this.commandBus.execute(new CreateOrderCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateOrder')
  async updateOrder(request: UpdateOrderInput, ctx: any): Promise<Order> {
    try {
      return await this.commandBus.execute(new UpdateOrderCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteOrder')
  async deleteOrder(request: Id, ctx: any): Promise<Order> {
    try {
      return await this.commandBus.execute(new DeleteOrderCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
