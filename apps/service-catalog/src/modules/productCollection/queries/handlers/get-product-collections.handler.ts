import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'
import { ProductCollection, ProductCollections } from '@vg/proto-schema'
import { GetProductCollectionsQuery } from '@vg/service-catalog/modules/productCollection/queries'

@QueryHandler(GetProductCollectionsQuery)
export class GetProductCollectionsHandler implements IQueryHandler<GetProductCollectionsQuery> {
  constructor(private readonly service: ProductCollectionService) {
  }

  async execute(data: GetProductCollectionsQuery): Promise<ProductCollections> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productCollections: result as ProductCollection[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
