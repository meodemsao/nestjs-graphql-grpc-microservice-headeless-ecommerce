import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountCategoryService } from '../../discountCategory.service'
import { DiscountCategory, NullableDiscountCategory } from '@vg/proto-schema'
import { GetDiscountCategoryQuery } from '../index'

@QueryHandler(GetDiscountCategoryQuery)
export class GetDiscountCategoryHandler
  implements IQueryHandler<GetDiscountCategoryQuery>
{
  constructor(private readonly service: DiscountCategoryService) {}

  async execute(
    query: GetDiscountCategoryQuery
  ): Promise<NullableDiscountCategory> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as DiscountCategory,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
