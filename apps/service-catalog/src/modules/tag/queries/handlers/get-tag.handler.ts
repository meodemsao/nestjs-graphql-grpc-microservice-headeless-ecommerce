import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'
import { Tag, NullableTag } from '@vg/proto-schema'
import { GetTagQuery } from '@vg/service-catalog/modules/tag/queries'

@QueryHandler(GetTagQuery)
export class GetTagHandler implements IQueryHandler<GetTagQuery> {
  constructor(private readonly service: TagService) {
  }

  async execute(query: GetTagQuery): Promise<NullableTag> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Tag,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}