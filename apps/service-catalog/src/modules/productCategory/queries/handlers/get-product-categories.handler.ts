import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'
import { ProductCategory, ProductCategories } from '@vg/proto-schema'
import { GetProductCategoriesQuery } from '@vg/service-catalog/modules/productCategory/queries'

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesHandler implements IQueryHandler<GetProductCategoriesQuery> {
  constructor(private readonly service: ProductCategoryService) {
  }

  async execute(data: GetProductCategoriesQuery): Promise<ProductCategories> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productCategories: result as ProductCategory[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
