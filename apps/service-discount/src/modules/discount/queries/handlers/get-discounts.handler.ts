import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountService } from '../../discount.service'
import { Discount, Discounts } from '@vg/proto-schema'
import { GetDiscountsQuery } from '../index'

@QueryHandler(GetDiscountsQuery)
export class GetDiscountsHandler implements IQueryHandler<GetDiscountsQuery> {
  constructor(private readonly service: DiscountService) {}

  async execute(data: GetDiscountsQuery): Promise<Discounts> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discounts: result as Discount[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
