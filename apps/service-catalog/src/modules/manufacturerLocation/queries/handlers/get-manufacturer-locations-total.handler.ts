import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'
import { GetManufacturerLocationsTotalQuery } from '@vg/service-catalog/modules/manufacturerLocation/queries'

@QueryHandler(GetManufacturerLocationsTotalQuery)
export class GetManufacturerLocationsTotalHandler implements IQueryHandler<GetManufacturerLocationsTotalQuery> {
  constructor(private readonly service: ManufacturerLocationService) {
  }

  async execute(data: GetManufacturerLocationsTotalQuery): Promise<Count> {
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
