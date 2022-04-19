import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'
import { ManufacturerStore, ManufacturerStores } from '@vg/proto-schema'
import { GetManufacturerStoresQuery } from '@vg/service-catalog/modules/manufacturerStore/queries'

@QueryHandler(GetManufacturerStoresQuery)
export class GetManufacturerStoresHandler implements IQueryHandler<GetManufacturerStoresQuery> {
  constructor(private readonly service: ManufacturerStoreService) {
  }

  async execute(data: GetManufacturerStoresQuery): Promise<ManufacturerStores> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        manufacturerStores: result as ManufacturerStore[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
