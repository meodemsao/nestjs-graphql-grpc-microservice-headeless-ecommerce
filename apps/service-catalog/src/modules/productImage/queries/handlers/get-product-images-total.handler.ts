import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'
import { GetProductImagesTotalQuery } from '@vg/service-catalog/modules/productImage/queries'

@QueryHandler(GetProductImagesTotalQuery)
export class GetProductImagesTotalHandler implements IQueryHandler<GetProductImagesTotalQuery> {
  constructor(private readonly service: ProductImageService) {
  }

  async execute(data: GetProductImagesTotalQuery): Promise<Count> {
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
