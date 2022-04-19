import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { OrderService } from '@vg/service-cart/modules/order/order.service'
import { Order, NullableOrder } from '@vg/proto-schema'
import { GetOrderQuery } from '@vg/service-cart/modules/order/queries'

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly service: OrderService) {}

  async execute(query: GetOrderQuery): Promise<NullableOrder> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Order,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
