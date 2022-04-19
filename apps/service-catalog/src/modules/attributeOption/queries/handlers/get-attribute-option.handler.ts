import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'
import { AttributeOption, NullableAttributeOption } from '@vg/proto-schema'
import { GetAttributeOptionQuery } from '@vg/service-catalog/modules/attributeOption/queries'

@QueryHandler(GetAttributeOptionQuery)
export class GetAttributeOptionHandler
  implements IQueryHandler<GetAttributeOptionQuery>
{
  constructor(private readonly service: AttributeOptionService) {}

  async execute(
    query: GetAttributeOptionQuery
  ): Promise<NullableAttributeOption> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as AttributeOption,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
