import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'
import { Product, Products } from '@vg/proto-schema'
import { GetProductsQuery } from '@vg/service-catalog/modules/product/queries'

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly service: ProductService) {
  }

  async execute(data: GetProductsQuery): Promise<Products> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        products: result as unknown as Product[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
