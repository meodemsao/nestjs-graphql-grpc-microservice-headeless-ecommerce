import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'
import { Store, NullableStore } from '@vg/proto-schema'
import { GetStoreQuery } from '@vg/service-inventory/modules/store/queries'

@QueryHandler(GetStoreQuery)
export class GetStoreHandler implements IQueryHandler<GetStoreQuery> {
  constructor(private readonly service: StoreService) {}

  async execute(query: GetStoreQuery): Promise<NullableStore> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Store,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
