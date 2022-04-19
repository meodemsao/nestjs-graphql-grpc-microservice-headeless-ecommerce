import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'
import { GetAttributeOptionsTotalQuery } from '@vg/service-catalog/modules/attributeOption/queries'

@QueryHandler(GetAttributeOptionsTotalQuery)
export class GetAttributeOptionsTotalHandler
  implements IQueryHandler<GetAttributeOptionsTotalQuery>
{
  constructor(private readonly service: AttributeOptionService) {}

  async execute(data: GetAttributeOptionsTotalQuery): Promise<Count> {
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
