import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'
import { CategoryStore, CategoryStores } from '@vg/proto-schema'
import { GetCategoryStoresQuery } from '@vg/service-catalog/modules/categoryStore/queries'

@QueryHandler(GetCategoryStoresQuery)
export class GetCategoryStoresHandler implements IQueryHandler<GetCategoryStoresQuery> {
  constructor(private readonly service: CategoryStoreService) {
  }

  async execute(data: GetCategoryStoresQuery): Promise<CategoryStores> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        CategoryStores: result as CategoryStore[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
