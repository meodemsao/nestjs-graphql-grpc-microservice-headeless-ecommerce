import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'
import {
  ProductVariantAvailability,
  NullableProductVariantAvailability
} from '@vg/proto-schema'
import { GetProductVariantAvailabilityQuery } from '@vg/service-catalog/modules/productVariantAvailability/queries'

@QueryHandler(GetProductVariantAvailabilityQuery)
export class GetProductVariantAvailabilityHandler
  implements IQueryHandler<GetProductVariantAvailabilityQuery>
{
  constructor(private readonly service: ProductVariantAvailabilityService) {}

  async execute(
    query: GetProductVariantAvailabilityQuery
  ): Promise<NullableProductVariantAvailability> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductVariantAvailability,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
