import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'
import { Attribute, Attributes } from '@vg/proto-schema'
import { GetAttributesQuery } from '@vg/service-catalog/modules/attribute/queries'

@QueryHandler(GetAttributesQuery)
export class GetAttributesHandler implements IQueryHandler<GetAttributesQuery> {
  constructor(private readonly service: AttributeService) {}

  async execute(data: GetAttributesQuery): Promise<Attributes> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        attributes: result as Attribute[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
