import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'
import { GetProductStoresTotalQuery } from '@vg/service-catalog/modules/productStore/queries'

@QueryHandler(GetProductStoresTotalQuery)
export class GetProductStoresTotalHandler implements IQueryHandler<GetProductStoresTotalQuery> {
  constructor(private readonly service: ProductStoreService) {
  }

  async execute(data: GetProductStoresTotalQuery): Promise<Count> {
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
