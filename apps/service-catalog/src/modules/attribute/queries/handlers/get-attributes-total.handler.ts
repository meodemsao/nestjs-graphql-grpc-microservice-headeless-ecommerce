import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'
import { GetAttributesTotalQuery } from '@vg/service-catalog/modules/attribute/queries'

@QueryHandler(GetAttributesTotalQuery)
export class GetAttributesTotalHandler
  implements IQueryHandler<GetAttributesTotalQuery>
{
  constructor(private readonly service: AttributeService) {}

  async execute(data: GetAttributesTotalQuery): Promise<Count> {
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
