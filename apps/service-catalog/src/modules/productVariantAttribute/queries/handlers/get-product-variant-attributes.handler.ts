import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'
import {
  ProductVariantAttribute,
  ProductVariantAttributes
} from '@vg/proto-schema'
import { GetProductVariantAttributesQuery } from '@vg/service-catalog/modules/productVariantAttribute/queries'

@QueryHandler(GetProductVariantAttributesQuery)
export class GetProductVariantAttributesHandler
  implements IQueryHandler<GetProductVariantAttributesQuery>
{
  constructor(private readonly service: ProductVariantAttributeService) {}

  async execute(
    data: GetProductVariantAttributesQuery
  ): Promise<ProductVariantAttributes> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productVariantAttributes: result as ProductVariantAttribute[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
