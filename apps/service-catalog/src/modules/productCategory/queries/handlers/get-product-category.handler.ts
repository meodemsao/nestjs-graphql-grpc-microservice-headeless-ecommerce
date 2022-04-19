import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'
import { ProductCategory, NullableProductCategory } from '@vg/proto-schema'
import { GetProductCategoryQuery } from '@vg/service-catalog/modules/productCategory/queries'

@QueryHandler(GetProductCategoryQuery)
export class GetProductCategoryHandler implements IQueryHandler<GetProductCategoryQuery> {
  constructor(private readonly service: ProductCategoryService) {
  }

  async execute(query: GetProductCategoryQuery): Promise<NullableProductCategory> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductCategory,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}