import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'
import { Location, Locations } from '@vg/proto-schema'
import { GetLocationsQuery } from '@vg/service-inventory/modules/location/queries'

@QueryHandler(GetLocationsQuery)
export class GetLocationsHandler implements IQueryHandler<GetLocationsQuery> {
  constructor(private readonly service: LocationService) {}

  async execute(data: GetLocationsQuery): Promise<Locations> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        locations: result as Location[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
