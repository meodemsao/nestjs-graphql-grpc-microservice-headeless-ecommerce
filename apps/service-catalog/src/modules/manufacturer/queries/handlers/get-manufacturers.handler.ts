import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'
import { Manufacturer, Manufacturers } from '@vg/proto-schema'
import { GetManufacturersQuery } from '@vg/service-catalog/modules/manufacturer/queries'

@QueryHandler(GetManufacturersQuery)
export class GetManufacturersHandler implements IQueryHandler<GetManufacturersQuery> {
  constructor(private readonly service: ManufacturerService) {
  }

  async execute(data: GetManufacturersQuery): Promise<Manufacturers> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        manufacturers: result as Manufacturer[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
