import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'
import { GetManufacturerStoresTotalQuery } from '@vg/service-catalog/modules/manufacturerStore/queries'

@QueryHandler(GetManufacturerStoresTotalQuery)
export class GetManufacturerStoresTotalHandler implements IQueryHandler<GetManufacturerStoresTotalQuery> {
  constructor(private readonly service: ManufacturerStoreService) {
  }

  async execute(data: GetManufacturerStoresTotalQuery): Promise<Count> {
    try {

      const result = await this.service.count(
        this.service.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
