import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'
import { ProductStore, NullableProductStore } from '@vg/proto-schema'
import { GetProductStoreQuery } from '@vg/service-catalog/modules/productStore/queries'

@QueryHandler(GetProductStoreQuery)
export class GetProductStoreHandler implements IQueryHandler<GetProductStoreQuery> {
  constructor(private readonly service: ProductStoreService) {
  }

  async execute(query: GetProductStoreQuery): Promise<NullableProductStore> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductStore,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}