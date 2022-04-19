import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'
import { ProductAttribute, NullableProductAttribute } from '@vg/proto-schema'
import { GetProductAttributeQuery } from '@vg/service-catalog/modules/productAttribute/queries'

@QueryHandler(GetProductAttributeQuery)
export class GetProductAttributeHandler implements IQueryHandler<GetProductAttributeQuery> {
  constructor(private readonly service: ProductAttributeService) {
  }

  async execute(query: GetProductAttributeQuery): Promise<NullableProductAttribute> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductAttribute,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}