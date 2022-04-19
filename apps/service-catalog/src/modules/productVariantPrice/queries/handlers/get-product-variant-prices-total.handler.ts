import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'
import { GetProductVariantPricesTotalQuery } from '@vg/service-catalog/modules/productVariantPrice/queries'

@QueryHandler(GetProductVariantPricesTotalQuery)
export class GetProductVariantPricesTotalHandler
  implements IQueryHandler<GetProductVariantPricesTotalQuery>
{
  constructor(private readonly service: ProductVariantPriceService) {}

  async execute(data: GetProductVariantPricesTotalQuery): Promise<Count> {
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
