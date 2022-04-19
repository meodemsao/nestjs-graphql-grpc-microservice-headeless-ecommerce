import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'
import { GetCategoryLocationsTotalQuery } from '@vg/service-catalog/modules/categoryLocation/queries'

@QueryHandler(GetCategoryLocationsTotalQuery)
export class GetCategoryLocationsTotalHandler implements IQueryHandler<GetCategoryLocationsTotalQuery> {
  constructor(private readonly service: CategoryLocationService) {
  }

  async execute(data: GetCategoryLocationsTotalQuery): Promise<Count> {
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
