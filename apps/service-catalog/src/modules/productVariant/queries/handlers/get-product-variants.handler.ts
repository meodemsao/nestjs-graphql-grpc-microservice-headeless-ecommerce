import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'
import { ProductVariant, ProductVariants } from '@vg/proto-schema'
import { GetProductVariantsQuery } from '@vg/service-catalog/modules/productVariant/queries'

@QueryHandler(GetProductVariantsQuery)
export class GetProductVariantsHandler
  implements IQueryHandler<GetProductVariantsQuery>
{
  constructor(private readonly service: ProductVariantService) {}

  async execute(data: GetProductVariantsQuery): Promise<ProductVariants> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productVariants: result as ProductVariant[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
