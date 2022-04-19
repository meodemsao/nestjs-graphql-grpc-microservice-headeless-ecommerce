import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'
import { GetProductCollectionsTotalQuery } from '@vg/service-catalog/modules/productCollection/queries'

@QueryHandler(GetProductCollectionsTotalQuery)
export class GetProductCollectionsTotalHandler implements IQueryHandler<GetProductCollectionsTotalQuery> {
  constructor(private readonly service: ProductCollectionService) {
  }

  async execute(data: GetProductCollectionsTotalQuery): Promise<Count> {
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
