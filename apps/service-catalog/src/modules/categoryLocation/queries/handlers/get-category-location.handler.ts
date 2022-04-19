import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'
import { CategoryLocation, NullableCategoryLocation } from '@vg/proto-schema'
import { GetCategoryLocationQuery } from '@vg/service-catalog/modules/categoryLocation/queries'

@QueryHandler(GetCategoryLocationQuery)
export class GetCategoryLocationHandler implements IQueryHandler<GetCategoryLocationQuery> {
  constructor(private readonly service: CategoryLocationService) {
  }

  async execute(query: GetCategoryLocationQuery): Promise<NullableCategoryLocation> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as CategoryLocation,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}