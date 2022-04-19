import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'
import { CollectionLocation, CollectionLocations } from '@vg/proto-schema'
import { GetCollectionLocationsQuery } from '@vg/service-catalog/modules/collectionLocation/queries'

@QueryHandler(GetCollectionLocationsQuery)
export class GetCollectionLocationsHandler implements IQueryHandler<GetCollectionLocationsQuery> {
  constructor(private readonly service: CollectionLocationService) {
  }

  async execute(data: GetCollectionLocationsQuery): Promise<CollectionLocations> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        collectionLocations: result as CollectionLocation[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
