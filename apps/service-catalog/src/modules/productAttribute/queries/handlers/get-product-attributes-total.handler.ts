import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'
import { GetProductAttributesTotalQuery } from '@vg/service-catalog/modules/productAttribute/queries'

@QueryHandler(GetProductAttributesTotalQuery)
export class GetProductAttributesTotalHandler implements IQueryHandler<GetProductAttributesTotalQuery> {
  constructor(private readonly service: ProductAttributeService) {
  }

  async execute(data: GetProductAttributesTotalQuery): Promise<Count> {
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
