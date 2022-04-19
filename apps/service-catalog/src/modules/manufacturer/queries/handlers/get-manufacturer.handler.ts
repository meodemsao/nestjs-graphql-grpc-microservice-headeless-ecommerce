import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'
import { Manufacturer, NullableManufacturer } from '@vg/proto-schema'
import { GetManufacturerQuery } from '@vg/service-catalog/modules/manufacturer/queries'

@QueryHandler(GetManufacturerQuery)
export class GetManufacturerHandler implements IQueryHandler<GetManufacturerQuery> {
  constructor(private readonly service: ManufacturerService) {
  }

  async execute(query: GetManufacturerQuery): Promise<NullableManufacturer> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Manufacturer,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}