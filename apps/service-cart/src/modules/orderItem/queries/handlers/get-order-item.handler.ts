import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'
import { OrderItem, NullableOrderItem } from '@vg/proto-schema'
import { GetOrderItemQuery } from '@vg/service-cart/modules/orderItem/queries'

@QueryHandler(GetOrderItemQuery)
export class GetOrderItemHandler implements IQueryHandler<GetOrderItemQuery> {
  constructor(private readonly service: OrderItemService) {}

  async execute(query: GetOrderItemQuery): Promise<NullableOrderItem> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as OrderItem,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
