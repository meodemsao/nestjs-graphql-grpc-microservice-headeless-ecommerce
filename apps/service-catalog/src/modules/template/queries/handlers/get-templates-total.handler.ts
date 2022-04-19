import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'
import { GetTemplatesTotalQuery } from '@vg/service-catalog/modules/template/queries'

@QueryHandler(GetTemplatesTotalQuery)
export class GetTemplatesTotalHandler implements IQueryHandler<GetTemplatesTotalQuery> {
  constructor(private readonly service: TemplateService) {
  }

  async execute(data: GetTemplatesTotalQuery): Promise<Count> {
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
