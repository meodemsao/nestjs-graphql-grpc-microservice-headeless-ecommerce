import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'
import { ProductCollection, NullableProductCollection } from '@vg/proto-schema'
import { GetProductCollectionQuery } from '@vg/service-catalog/modules/productCollection/queries'

@QueryHandler(GetProductCollectionQuery)
export class GetProductCollectionHandler implements IQueryHandler<GetProductCollectionQuery> {
  constructor(private readonly service: ProductCollectionService) {
  }

  async execute(query: GetProductCollectionQuery): Promise<NullableProductCollection> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductCollection,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}