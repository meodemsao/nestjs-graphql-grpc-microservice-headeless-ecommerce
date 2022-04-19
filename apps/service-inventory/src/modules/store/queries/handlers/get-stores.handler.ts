import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'
import { Store, Stores } from '@vg/proto-schema'
import { GetStoresQuery } from '@vg/service-inventory/modules/store/queries'

@QueryHandler(GetStoresQuery)
export class GetStoresHandler implements IQueryHandler<GetStoresQuery> {
  constructor(private readonly service: StoreService) {}

  async execute(data: GetStoresQuery): Promise<Stores> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        stores: result as Store[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
