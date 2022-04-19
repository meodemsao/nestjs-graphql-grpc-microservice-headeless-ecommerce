import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'
import { GetProductLocationsTotalQuery } from '@vg/service-catalog/modules/productLocation/queries'

@QueryHandler(GetProductLocationsTotalQuery)
export class GetProductLocationsTotalHandler implements IQueryHandler<GetProductLocationsTotalQuery> {
  constructor(private readonly service: ProductLocationService) {
  }

  async execute(data: GetProductLocationsTotalQuery): Promise<Count> {
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
