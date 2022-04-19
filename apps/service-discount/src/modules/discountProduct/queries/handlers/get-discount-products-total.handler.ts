import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountProductService } from '../../discountProduct.service'
import { GetDiscountProductsTotalQuery } from '../index'

@QueryHandler(GetDiscountProductsTotalQuery)
export class GetDiscountProductsTotalHandler
  implements IQueryHandler<GetDiscountProductsTotalQuery>
{
  constructor(private readonly service: DiscountProductService) {}

  async execute(data: GetDiscountProductsTotalQuery): Promise<Count> {
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
