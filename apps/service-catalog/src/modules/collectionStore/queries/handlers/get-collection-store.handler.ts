import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'
import { CollectionStore, NullableCollectionStore } from '@vg/proto-schema'
import { GetCollectionStoreQuery } from '@vg/service-catalog/modules/collectionStore/queries'

@QueryHandler(GetCollectionStoreQuery)
export class GetCollectionStoreHandler implements IQueryHandler<GetCollectionStoreQuery> {
  constructor(private readonly service: CollectionStoreService) {
  }

  async execute(query: GetCollectionStoreQuery): Promise<NullableCollectionStore> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as CollectionStore,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}