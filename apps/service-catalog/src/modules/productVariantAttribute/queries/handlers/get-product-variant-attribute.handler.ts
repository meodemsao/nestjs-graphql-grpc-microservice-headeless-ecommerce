import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'
import {
  ProductVariantAttribute,
  NullableProductVariantAttribute
} from '@vg/proto-schema'
import { GetProductVariantAttributeQuery } from '@vg/service-catalog/modules/productVariantAttribute/queries'

@QueryHandler(GetProductVariantAttributeQuery)
export class GetProductVariantAttributeHandler
  implements IQueryHandler<GetProductVariantAttributeQuery>
{
  constructor(private readonly service: ProductVariantAttributeService) {}

  async execute(
    query: GetProductVariantAttributeQuery
  ): Promise<NullableProductVariantAttribute> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductVariantAttribute,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
