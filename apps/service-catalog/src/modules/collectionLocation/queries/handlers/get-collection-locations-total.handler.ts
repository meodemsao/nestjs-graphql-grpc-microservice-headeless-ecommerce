import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'
import { GetCollectionLocationsTotalQuery } from '@vg/service-catalog/modules/collectionLocation/queries'

@QueryHandler(GetCollectionLocationsTotalQuery)
export class GetCollectionLocationsTotalHandler implements IQueryHandler<GetCollectionLocationsTotalQuery> {
  constructor(private readonly service: CollectionLocationService) {
  }

  async execute(data: GetCollectionLocationsTotalQuery): Promise<Count> {
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
