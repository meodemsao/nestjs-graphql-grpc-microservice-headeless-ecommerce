import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountCategoryService } from '../../discountCategory.service'
import { GetDiscountCategoriesTotalQuery } from '../index'

@QueryHandler(GetDiscountCategoriesTotalQuery)
export class GetDiscountCategoriesTotalHandler
  implements IQueryHandler<GetDiscountCategoriesTotalQuery>
{
  constructor(private readonly service: DiscountCategoryService) {}

  async execute(data: GetDiscountCategoriesTotalQuery): Promise<Count> {
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
