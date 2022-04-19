import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'
import { Template, NullableTemplate } from '@vg/proto-schema'
import { GetTemplateQuery } from '@vg/service-catalog/modules/template/queries'

@QueryHandler(GetTemplateQuery)
export class GetTemplateHandler implements IQueryHandler<GetTemplateQuery> {
  constructor(private readonly service: TemplateService) {
  }

  async execute(query: GetTemplateQuery): Promise<NullableTemplate> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Template,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}