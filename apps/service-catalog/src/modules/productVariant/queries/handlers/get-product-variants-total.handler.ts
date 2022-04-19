import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'
import { GetProductVariantsTotalQuery } from '@vg/service-catalog/modules/productVariant/queries'

@QueryHandler(GetProductVariantsTotalQuery)
export class GetProductVariantsTotalHandler
  implements IQueryHandler<GetProductVariantsTotalQuery>
{
  constructor(private readonly service: ProductVariantService) {}

  async execute(data: GetProductVariantsTotalQuery): Promise<Count> {
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
