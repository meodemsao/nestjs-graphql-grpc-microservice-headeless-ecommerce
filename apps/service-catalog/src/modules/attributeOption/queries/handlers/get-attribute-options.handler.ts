import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'
import { AttributeOption, AttributeOptions } from '@vg/proto-schema'
import { GetAttributeOptionsQuery } from '@vg/service-catalog/modules/attributeOption/queries'

@QueryHandler(GetAttributeOptionsQuery)
export class GetAttributeOptionsHandler
  implements IQueryHandler<GetAttributeOptionsQuery>
{
  constructor(private readonly service: AttributeOptionService) {}

  async execute(data: GetAttributeOptionsQuery): Promise<AttributeOptions> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        attributeOptions: result as AttributeOption[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
