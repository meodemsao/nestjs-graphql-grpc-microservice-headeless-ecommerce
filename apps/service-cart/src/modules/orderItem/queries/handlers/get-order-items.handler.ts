import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'
import { OrderItem, OrderItems } from '@vg/proto-schema'
import { GetOrderItemsQuery } from '@vg/service-cart/modules/orderItem/queries'

@QueryHandler(GetOrderItemsQuery)
export class GetOrderItemsHandler implements IQueryHandler<GetOrderItemsQuery> {
  constructor(private readonly service: OrderItemService) {}

  async execute(data: GetOrderItemsQuery): Promise<OrderItems> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        orderItems: result as OrderItem[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
