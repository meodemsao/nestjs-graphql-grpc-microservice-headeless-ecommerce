import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'
import { CategoryLocation, CategoryLocations } from '@vg/proto-schema'
import { GetCategoryLocationsQuery } from '@vg/service-catalog/modules/categoryLocation/queries'

@QueryHandler(GetCategoryLocationsQuery)
export class GetCategoryLocationsHandler implements IQueryHandler<GetCategoryLocationsQuery> {
  constructor(private readonly service: CategoryLocationService) {
  }

  async execute(data: GetCategoryLocationsQuery): Promise<CategoryLocations> {
    try {

      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        categoryLocations: result as CategoryLocation[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
