import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'
import { Tag, Tags } from '@vg/proto-schema'
import { GetTagsQuery } from '@vg/service-catalog/modules/tag/queries'

@QueryHandler(GetTagsQuery)
export class GetTagsHandler implements IQueryHandler<GetTagsQuery> {
  constructor(private readonly service: TagService) {
  }

  async execute(data: GetTagsQuery): Promise<Tags> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        Tags: result as Tag[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
