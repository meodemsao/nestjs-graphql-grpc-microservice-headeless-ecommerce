import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'
import { MetaTag, NullableMetaTag } from '@vg/proto-schema'
import { GetMetaTagQuery } from '@vg/service-catalog/modules/metaTag/queries'

@QueryHandler(GetMetaTagQuery)
export class GetMetaTagHandler implements IQueryHandler<GetMetaTagQuery> {
  constructor(private readonly service: MetaTagService) {}

  async execute(query: GetMetaTagQuery): Promise<NullableMetaTag> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as MetaTag,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
