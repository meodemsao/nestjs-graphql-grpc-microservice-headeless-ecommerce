import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'
import { CollectionLocation, NullableCollectionLocation } from '@vg/proto-schema'
import { GetCollectionLocationQuery } from '@vg/service-catalog/modules/collectionLocation/queries'

@QueryHandler(GetCollectionLocationQuery)
export class GetCollectionLocationHandler implements IQueryHandler<GetCollectionLocationQuery> {
  constructor(private readonly service: CollectionLocationService) {
  }

  async execute(query: GetCollectionLocationQuery): Promise<NullableCollectionLocation> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as CollectionLocation,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}