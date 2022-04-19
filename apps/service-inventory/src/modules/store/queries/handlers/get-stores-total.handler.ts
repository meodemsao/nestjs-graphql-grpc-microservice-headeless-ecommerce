import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'
import { GetStoresTotalQuery } from '@vg/service-inventory/modules/store/queries'

@QueryHandler(GetStoresTotalQuery)
export class GetStoresTotalHandler
  implements IQueryHandler<GetStoresTotalQuery>
{
  constructor(private readonly service: StoreService) {}

  async execute(data: GetStoresTotalQuery): Promise<Count> {
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
