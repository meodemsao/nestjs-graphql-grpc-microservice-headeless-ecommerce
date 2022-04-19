import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'
import { Product, NullableProduct } from '@vg/proto-schema'
import { GetProductQuery } from '@vg/service-catalog/modules/product/queries'
import { ProductDto } from '@vg/api-gateway/modules/product/dto/product.dto'

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly service: ProductService) {
  }

  async execute(query: GetProductQuery): Promise<NullableProduct> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as unknown as Product,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}