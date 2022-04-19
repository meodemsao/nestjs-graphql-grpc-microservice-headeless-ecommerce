import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'
import { ProductVariantPrice, ProductVariantPrices } from '@vg/proto-schema'
import { GetProductVariantPricesQuery } from '@vg/service-catalog/modules/productVariantPrice/queries'

@QueryHandler(GetProductVariantPricesQuery)
export class GetProductVariantPricesHandler
  implements IQueryHandler<GetProductVariantPricesQuery>
{
  constructor(private readonly service: ProductVariantPriceService) {}

  async execute(
    data: GetProductVariantPricesQuery
  ): Promise<ProductVariantPrices> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productVariantPrices: result as ProductVariantPrice[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
