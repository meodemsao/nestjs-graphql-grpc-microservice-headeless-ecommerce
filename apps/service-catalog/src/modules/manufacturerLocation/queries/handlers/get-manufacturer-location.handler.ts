import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'
import { ManufacturerLocation, NullableManufacturerLocation } from '@vg/proto-schema'
import { GetManufacturerLocationQuery } from '@vg/service-catalog/modules/manufacturerLocation/queries'

@QueryHandler(GetManufacturerLocationQuery)
export class GetManufacturerLocationHandler implements IQueryHandler<GetManufacturerLocationQuery> {
  constructor(private readonly service: ManufacturerLocationService) {
  }

  async execute(query: GetManufacturerLocationQuery): Promise<NullableManufacturerLocation> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ManufacturerLocation,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}