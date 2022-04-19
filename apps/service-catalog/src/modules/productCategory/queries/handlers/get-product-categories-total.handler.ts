import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'
import { GetProductCategoriesTotalQuery } from '@vg/service-catalog/modules/productCategory/queries'

@QueryHandler(GetProductCategoriesTotalQuery)
export class GetProductCategoriesTotalHandler implements IQueryHandler<GetProductCategoriesTotalQuery> {
  constructor(private readonly service: ProductCategoryService) {
  }

  async execute(data: GetProductCategoriesTotalQuery): Promise<Count> {
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
