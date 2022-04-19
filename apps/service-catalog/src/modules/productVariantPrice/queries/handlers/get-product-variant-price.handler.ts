import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'
import {
  ProductVariantPrice,
  NullableProductVariantPrice
} from '@vg/proto-schema'
import { GetProductVariantPriceQuery } from '@vg/service-catalog/modules/productVariantPrice/queries'

@QueryHandler(GetProductVariantPriceQuery)
export class GetProductVariantPriceHandler
  implements IQueryHandler<GetProductVariantPriceQuery>
{
  constructor(private readonly service: ProductVariantPriceService) {}

  async execute(
    query: GetProductVariantPriceQuery
  ): Promise<NullableProductVariantPrice> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductVariantPrice,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
