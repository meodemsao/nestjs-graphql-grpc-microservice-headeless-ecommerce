import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'
import { Location, NullableLocation } from '@vg/proto-schema'
import { GetLocationQuery } from '@vg/service-inventory/modules/location/queries'

@QueryHandler(GetLocationQuery)
export class GetLocationHandler implements IQueryHandler<GetLocationQuery> {
  constructor(private readonly service: LocationService) {}

  async execute(query: GetLocationQuery): Promise<NullableLocation> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Location,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
