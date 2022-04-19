import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'
import { ProductAttribute, ProductAttributes } from '@vg/proto-schema'
import { GetProductAttributesQuery } from '@vg/service-catalog/modules/productAttribute/queries'

@QueryHandler(GetProductAttributesQuery)
export class GetProductAttributesHandler implements IQueryHandler<GetProductAttributesQuery> {
  constructor(private readonly service: ProductAttributeService) {
  }

  async execute(data: GetProductAttributesQuery): Promise<ProductAttributes> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productAttributes: result as ProductAttribute[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
