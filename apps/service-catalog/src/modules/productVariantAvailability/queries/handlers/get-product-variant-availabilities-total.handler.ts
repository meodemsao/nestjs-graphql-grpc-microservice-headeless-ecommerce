import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'
import { GetProductVariantAvailabilitiesTotalQuery } from '@vg/service-catalog/modules/productVariantAvailability/queries'

@QueryHandler(GetProductVariantAvailabilitiesTotalQuery)
export class GetProductVariantAvailabilitiesTotalHandler
  implements IQueryHandler<GetProductVariantAvailabilitiesTotalQuery>
{
  constructor(private readonly service: ProductVariantAvailabilityService) {}

  async execute(
    data: GetProductVariantAvailabilitiesTotalQuery
  ): Promise<Count> {
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
