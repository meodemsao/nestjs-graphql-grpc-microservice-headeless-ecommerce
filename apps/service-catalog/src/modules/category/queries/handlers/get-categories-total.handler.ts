import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetCategoriesTotalQuery } from '@vg/service-catalog/modules/category/queries/impl'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'

@QueryHandler(GetCategoriesTotalQuery)
export class GetCategoriesTotalHandler implements IQueryHandler<GetCategoriesTotalQuery> {
  constructor(private readonly catalogService: CategoryService) {
  }

  async execute(data: GetCategoriesTotalQuery): Promise<Count> {
    try {

      const result = await this.catalogService.count(
        this.catalogService.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
