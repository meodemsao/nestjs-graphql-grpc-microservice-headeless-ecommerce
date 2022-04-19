import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'
import { MetaTag, MetaTags } from '@vg/proto-schema'
import { GetMetaTagsQuery } from '@vg/service-catalog/modules/metaTag/queries'

@QueryHandler(GetMetaTagsQuery)
export class GetMetaTagsHandler implements IQueryHandler<GetMetaTagsQuery> {
  constructor(private readonly service: MetaTagService) {}

  async execute(data: GetMetaTagsQuery): Promise<MetaTags> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        metaTags: result as MetaTag[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
