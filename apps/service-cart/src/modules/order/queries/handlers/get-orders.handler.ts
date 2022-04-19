import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { OrderService } from '@vg/service-cart/modules/order/order.service'
import { Order, Orders } from '@vg/proto-schema'
import { GetOrdersQuery } from '@vg/service-cart/modules/order/queries'

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly service: OrderService) {}

  async execute(data: GetOrdersQuery): Promise<Orders> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        orders: result as Order[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
