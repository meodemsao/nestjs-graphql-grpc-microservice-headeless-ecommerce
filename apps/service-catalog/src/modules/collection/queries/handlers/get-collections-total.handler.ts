import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'
import { GetCollectionsTotalQuery } from '@vg/service-catalog/modules/collection/queries'

@QueryHandler(GetCollectionsTotalQuery)
export class GetCollectionsTotalHandler implements IQueryHandler<GetCollectionsTotalQuery> {
  constructor(private readonly service: CollectionService) {
  }

  async execute(data: GetCollectionsTotalQuery): Promise<Count> {
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
