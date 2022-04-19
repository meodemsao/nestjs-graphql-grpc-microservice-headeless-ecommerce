import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'
import { Attribute, NullableAttribute } from '@vg/proto-schema'
import { GetAttributeQuery } from '@vg/service-catalog/modules/attribute/queries'

@QueryHandler(GetAttributeQuery)
export class GetAttributeHandler implements IQueryHandler<GetAttributeQuery> {
  constructor(private readonly service: AttributeService) {}

  async execute(query: GetAttributeQuery): Promise<NullableAttribute> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Attribute,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
