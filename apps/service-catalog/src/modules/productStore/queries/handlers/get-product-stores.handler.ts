import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'
import { ProductStore, ProductStores } from '@vg/proto-schema'
import { GetProductStoresQuery } from '@vg/service-catalog/modules/productStore/queries'

@QueryHandler(GetProductStoresQuery)
export class GetProductStoresHandler implements IQueryHandler<GetProductStoresQuery> {
  constructor(private readonly service: ProductStoreService) {
  }

  async execute(data: GetProductStoresQuery): Promise<ProductStores> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productStores: result as ProductStore[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
