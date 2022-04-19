import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'
import { CollectionStore, CollectionStores } from '@vg/proto-schema'
import { GetCollectionStoresQuery } from '@vg/service-catalog/modules/collectionStore/queries'

@QueryHandler(GetCollectionStoresQuery)
export class GetCollectionStoresHandler implements IQueryHandler<GetCollectionStoresQuery> {
  constructor(private readonly service: CollectionStoreService) {
  }

  async execute(data: GetCollectionStoresQuery): Promise<CollectionStores> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        collectionStores: result as CollectionStore[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
