import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'
import { ProductVariant, NullableProductVariant } from '@vg/proto-schema'
import { GetProductVariantQuery } from '@vg/service-catalog/modules/productVariant/queries'

@QueryHandler(GetProductVariantQuery)
export class GetProductVariantHandler
  implements IQueryHandler<GetProductVariantQuery>
{
  constructor(private readonly service: ProductVariantService) {}

  async execute(
    query: GetProductVariantQuery
  ): Promise<NullableProductVariant> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductVariant,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
