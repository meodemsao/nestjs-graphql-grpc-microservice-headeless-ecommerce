import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'
import { ProductImage, NullableProductImage } from '@vg/proto-schema'
import { GetProductImageQuery } from '@vg/service-catalog/modules/productImage/queries'

@QueryHandler(GetProductImageQuery)
export class GetProductImageHandler implements IQueryHandler<GetProductImageQuery> {
  constructor(private readonly service: ProductImageService) {
  }

  async execute(query: GetProductImageQuery): Promise<NullableProductImage> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductImage,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}