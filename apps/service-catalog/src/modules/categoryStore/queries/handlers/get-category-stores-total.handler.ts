import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'
import { GetCategoryStoresTotalQuery } from '@vg/service-catalog/modules/categoryStore/queries'

@QueryHandler(GetCategoryStoresTotalQuery)
export class GetCategoryStoresTotalHandler implements IQueryHandler<GetCategoryStoresTotalQuery> {
  constructor(private readonly service: CategoryStoreService) {
  }

  async execute(data: GetCategoryStoresTotalQuery): Promise<Count> {
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
