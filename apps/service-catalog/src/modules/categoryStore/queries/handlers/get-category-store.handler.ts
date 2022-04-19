import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'
import { CategoryStore, NullableCategoryStore } from '@vg/proto-schema'
import { GetCategoryStoreQuery } from '@vg/service-catalog/modules/categoryStore/queries'

@QueryHandler(GetCategoryStoreQuery)
export class GetCategoryStoreHandler implements IQueryHandler<GetCategoryStoreQuery> {
  constructor(private readonly service: CategoryStoreService) {
  }

  async execute(query: GetCategoryStoreQuery): Promise<NullableCategoryStore> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as CategoryStore,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}