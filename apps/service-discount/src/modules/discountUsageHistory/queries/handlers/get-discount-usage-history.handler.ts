import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'
import {
  DiscountUsageHistory,
  NullableDiscountUsageHistory
} from '@vg/proto-schema'
import { GetDiscountUsageHistoryQuery } from '../index'

@QueryHandler(GetDiscountUsageHistoryQuery)
export class GetDiscountUsageHistoryHandler
  implements IQueryHandler<GetDiscountUsageHistoryQuery>
{
  constructor(private readonly service: DiscountUsageHistoryService) {}

  async execute(
    query: GetDiscountUsageHistoryQuery
  ): Promise<NullableDiscountUsageHistory> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as DiscountUsageHistory,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
