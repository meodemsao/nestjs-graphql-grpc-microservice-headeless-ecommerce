import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'
import { GetProductVariantAttributesTotalQuery } from '@vg/service-catalog/modules/productVariantAttribute/queries'

@QueryHandler(GetProductVariantAttributesTotalQuery)
export class GetProductVariantAttributesTotalHandler
  implements IQueryHandler<GetProductVariantAttributesTotalQuery>
{
  constructor(private readonly service: ProductVariantAttributeService) {}

  async execute(data: GetProductVariantAttributesTotalQuery): Promise<Count> {
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
