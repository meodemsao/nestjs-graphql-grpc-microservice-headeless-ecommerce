import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'
import { Collection, NullableCollection } from '@vg/proto-schema'
import { GetCollectionQuery } from '@vg/service-catalog/modules/collection/queries'

@QueryHandler(GetCollectionQuery)
export class GetCollectionHandler implements IQueryHandler<GetCollectionQuery> {
  constructor(private readonly service: CollectionService) {
  }

  async execute(query: GetCollectionQuery): Promise<NullableCollection> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Collection,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}