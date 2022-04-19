import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetCategoriesQuery } from '@vg/service-catalog/modules/category/queries/impl'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { Categories, Category } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
  constructor(private readonly catalogService: CategoryService) {
  }

  async execute(data: GetCategoriesQuery): Promise<Categories> {
    try {

      const result = await this.catalogService.find(
        this.catalogService.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        categories: result as Category[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
