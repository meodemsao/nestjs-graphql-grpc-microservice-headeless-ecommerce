import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountCategoryService } from '../../discountCategory.service'
import { DiscountCategory, DiscountCategories } from '@vg/proto-schema'
import { GetDiscountCategoriesQuery } from '../index'

@QueryHandler(GetDiscountCategoriesQuery)
export class GetDiscountCategoriesHandler
  implements IQueryHandler<GetDiscountCategoriesQuery>
{
  constructor(private readonly service: DiscountCategoryService) {}

  async execute(data: GetDiscountCategoriesQuery): Promise<DiscountCategories> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discountCategories: result as DiscountCategory[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
