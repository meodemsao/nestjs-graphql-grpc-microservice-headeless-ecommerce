import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'
import {
  ProductVariantAvailability,
  ProductVariantAvailabilities
} from '@vg/proto-schema'
import { GetProductVariantAvailabilitiesQuery } from '@vg/service-catalog/modules/productVariantAvailability/queries'

@QueryHandler(GetProductVariantAvailabilitiesQuery)
export class GetProductVariantAvailabilitiesHandler
  implements IQueryHandler<GetProductVariantAvailabilitiesQuery>
{
  constructor(private readonly service: ProductVariantAvailabilityService) {}

  async execute(
    data: GetProductVariantAvailabilitiesQuery
  ): Promise<ProductVariantAvailabilities> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productVariantAvailabilities: result as ProductVariantAvailability[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
