import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'
import { ProductImage, ProductImages } from '@vg/proto-schema'
import { GetProductImagesQuery } from '@vg/service-catalog/modules/productImage/queries'

@QueryHandler(GetProductImagesQuery)
export class GetProductImagesHandler implements IQueryHandler<GetProductImagesQuery> {
  constructor(private readonly service: ProductImageService) {
  }

  async execute(data: GetProductImagesQuery): Promise<ProductImages> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productImages: result as ProductImage[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
