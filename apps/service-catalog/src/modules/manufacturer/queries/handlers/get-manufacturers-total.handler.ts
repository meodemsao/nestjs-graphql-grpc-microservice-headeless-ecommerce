import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'
import { GetManufacturersTotalQuery } from '@vg/service-catalog/modules/manufacturer/queries'

@QueryHandler(GetManufacturersTotalQuery)
export class GetManufacturersTotalHandler implements IQueryHandler<GetManufacturersTotalQuery> {
  constructor(private readonly service: ManufacturerService) {
  }

  async execute(data: GetManufacturersTotalQuery): Promise<Count> {
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
