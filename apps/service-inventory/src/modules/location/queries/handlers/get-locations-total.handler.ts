import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'
import { GetLocationsTotalQuery } from '@vg/service-inventory/modules/location/queries'

@QueryHandler(GetLocationsTotalQuery)
export class GetLocationsTotalHandler
  implements IQueryHandler<GetLocationsTotalQuery>
{
  constructor(private readonly service: LocationService) {}

  async execute(data: GetLocationsTotalQuery): Promise<Count> {
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
