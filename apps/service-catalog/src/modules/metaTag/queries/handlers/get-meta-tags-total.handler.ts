import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'
import { GetMetaTagsTotalQuery } from '@vg/service-catalog/modules/metaTag/queries'

@QueryHandler(GetMetaTagsTotalQuery)
export class GetMetaTagsTotalHandler
  implements IQueryHandler<GetMetaTagsTotalQuery>
{
  constructor(private readonly service: MetaTagService) {}

  async execute(data: GetMetaTagsTotalQuery): Promise<Count> {
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
