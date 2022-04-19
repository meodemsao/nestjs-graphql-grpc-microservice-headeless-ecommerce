import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'
import { DiscountUsageHistory, DiscountUsageHistories } from '@vg/proto-schema'
import { GetDiscountUsageHistoriesQuery } from '../index'

@QueryHandler(GetDiscountUsageHistoriesQuery)
export class GetDiscountUsageHistoriesHandler
  implements IQueryHandler<GetDiscountUsageHistoriesQuery>
{
  constructor(private readonly service: DiscountUsageHistoryService) {}

  async execute(
    data: GetDiscountUsageHistoriesQuery
  ): Promise<DiscountUsageHistories> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        discountUsageHistories: result as DiscountUsageHistory[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
