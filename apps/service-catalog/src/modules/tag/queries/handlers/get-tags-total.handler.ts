import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'
import { GetTagsTotalQuery } from '@vg/service-catalog/modules/tag/queries'

@QueryHandler(GetTagsTotalQuery)
export class GetTagsTotalHandler implements IQueryHandler<GetTagsTotalQuery> {
  constructor(private readonly service: TagService) {
  }

  async execute(data: GetTagsTotalQuery): Promise<Count> {
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
