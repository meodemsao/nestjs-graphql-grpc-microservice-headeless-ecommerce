import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'
import { ManufacturerStore, NullableManufacturerStore } from '@vg/proto-schema'
import { GetManufacturerStoreQuery } from '@vg/service-catalog/modules/manufacturerStore/queries'

@QueryHandler(GetManufacturerStoreQuery)
export class GetManufacturerStoreHandler implements IQueryHandler<GetManufacturerStoreQuery> {
  constructor(private readonly service: ManufacturerStoreService) {
  }

  async execute(query: GetManufacturerStoreQuery): Promise<NullableManufacturerStore> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ManufacturerStore,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}