import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'
import { GetCollectionStoresTotalQuery } from '@vg/service-catalog/modules/collectionStore/queries'

@QueryHandler(GetCollectionStoresTotalQuery)
export class GetCollectionStoresTotalHandler implements IQueryHandler<GetCollectionStoresTotalQuery> {
  constructor(private readonly service: CollectionStoreService) {
  }

  async execute(data: GetCollectionStoresTotalQuery): Promise<Count> {
    try {

      const result = await this.service.count(
        this.service.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
