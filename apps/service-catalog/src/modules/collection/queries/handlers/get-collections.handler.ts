import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'
import { Collection, Collections } from '@vg/proto-schema'
import { GetCollectionsQuery } from '@vg/service-catalog/modules/collection/queries'

@QueryHandler(GetCollectionsQuery)
export class GetCollectionsHandler implements IQueryHandler<GetCollectionsQuery> {
  constructor(private readonly service: CollectionService) {
  }

  async execute(data: GetCollectionsQuery): Promise<Collections> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        collections: result as Collection[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
