import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'
import { GetOrderItemsTotalQuery } from '@vg/service-cart/modules/orderItem/queries'

@QueryHandler(GetOrderItemsTotalQuery)
export class GetOrderItemsTotalHandler
  implements IQueryHandler<GetOrderItemsTotalQuery>
{
  constructor(private readonly service: OrderItemService) {}

  async execute(data: GetOrderItemsTotalQuery): Promise<Count> {
    try {
      const result = await this.service.count(
        this.service.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
