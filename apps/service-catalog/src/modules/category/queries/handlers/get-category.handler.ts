import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetCategoryQuery } from '@vg/service-catalog/modules/category/queries/impl'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { RpcException } from '@nestjs/microservices'
import { Category, NullableCategory } from '@vg/proto-schema'

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(private readonly catalogService: CategoryService) {
  }

  async execute(query: GetCategoryQuery): Promise<NullableCategory> {
    try {
      const result = await this.catalogService.findById(query.id)

      return {
        data: result as Category,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}