import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountService } from '../../discount.service'
import { GetDiscountsTotalQuery } from '../index'

@QueryHandler(GetDiscountsTotalQuery)
export class GetDiscountsTotalHandler
  implements IQueryHandler<GetDiscountsTotalQuery>
{
  constructor(private readonly service: DiscountService) {}

  async execute(data: GetDiscountsTotalQuery): Promise<Count> {
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
