import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'
import { ManufacturerLocation, ManufacturerLocations } from '@vg/proto-schema'
import { GetManufacturerLocationsQuery } from '@vg/service-catalog/modules/manufacturerLocation/queries'

@QueryHandler(GetManufacturerLocationsQuery)
export class GetManufacturerLocationsHandler implements IQueryHandler<GetManufacturerLocationsQuery> {
  constructor(private readonly service: ManufacturerLocationService) {
  }

  async execute(data: GetManufacturerLocationsQuery): Promise<ManufacturerLocations> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        manufacturerLocations: result as ManufacturerLocation[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
