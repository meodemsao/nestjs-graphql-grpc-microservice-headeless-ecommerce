import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountService } from '../../discount.service'
import { Discount, NullableDiscount } from '@vg/proto-schema'
import { GetDiscountQuery } from '../index'

@QueryHandler(GetDiscountQuery)
export class GetDiscountHandler implements IQueryHandler<GetDiscountQuery> {
  constructor(private readonly service: DiscountService) {}

  async execute(query: GetDiscountQuery): Promise<NullableDiscount> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as Discount,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
