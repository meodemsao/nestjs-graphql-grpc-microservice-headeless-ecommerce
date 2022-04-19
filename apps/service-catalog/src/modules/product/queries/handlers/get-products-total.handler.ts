import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'
import { GetProductsTotalQuery } from '@vg/service-catalog/modules/product/queries'

@QueryHandler(GetProductsTotalQuery)
export class GetProductsTotalHandler implements IQueryHandler<GetProductsTotalQuery> {
  constructor(private readonly service: ProductService) {
  }

  async execute(data: GetProductsTotalQuery): Promise<Count> {
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
