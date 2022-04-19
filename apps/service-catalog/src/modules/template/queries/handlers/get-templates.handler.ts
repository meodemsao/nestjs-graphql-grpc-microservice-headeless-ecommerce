import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'
import { Template, Templates } from '@vg/proto-schema'
import { GetTemplatesQuery } from '@vg/service-catalog/modules/template/queries'

@QueryHandler(GetTemplatesQuery)
export class GetTemplatesHandler implements IQueryHandler<GetTemplatesQuery> {
  constructor(private readonly service: TemplateService) {
  }

  async execute(data: GetTemplatesQuery): Promise<Templates> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        templates: result as Template[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
