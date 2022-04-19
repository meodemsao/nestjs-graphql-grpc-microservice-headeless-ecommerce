import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountManufacturerService } from '../../discountManufacturer.service'
import {
  DiscountManufacturer,
  NullableDiscountManufacturer
} from '@vg/proto-schema'
import { GetDiscountManufacturerQuery } from '../index'

@QueryHandler(GetDiscountManufacturerQuery)
export class GetDiscountManufacturerHandler
  implements IQueryHandler<GetDiscountManufacturerQuery>
{
  constructor(private readonly service: DiscountManufacturerService) {}

  async execute(
    query: GetDiscountManufacturerQuery
  ): Promise<NullableDiscountManufacturer> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as DiscountManufacturer,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
