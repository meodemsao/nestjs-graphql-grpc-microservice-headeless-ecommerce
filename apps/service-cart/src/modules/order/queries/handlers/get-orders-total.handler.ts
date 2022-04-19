import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { OrderService } from '@vg/service-cart/modules/order/order.service'
import { GetOrdersTotalQuery } from '@vg/service-cart/modules/order/queries'

@QueryHandler(GetOrdersTotalQuery)
export class GetOrdersTotalHandler
  implements IQueryHandler<GetOrdersTotalQuery>
{
  constructor(private readonly service: OrderService) {}

  async execute(data: GetOrdersTotalQuery): Promise<Count> {
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
