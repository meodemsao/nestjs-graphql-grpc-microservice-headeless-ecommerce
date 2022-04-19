import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'
import { ProductLocation, NullableProductLocation } from '@vg/proto-schema'
import { GetProductLocationQuery } from '@vg/service-catalog/modules/productLocation/queries'

@QueryHandler(GetProductLocationQuery)
export class GetProductLocationHandler implements IQueryHandler<GetProductLocationQuery> {
  constructor(private readonly service: ProductLocationService) {
  }

  async execute(query: GetProductLocationQuery): Promise<NullableProductLocation> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductLocation,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}