import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DiscountUsageHistoryService } from '../../discountUsageHistory.service'
import { GetDiscountUsageHistoriesTotalQuery } from '../index'

@QueryHandler(GetDiscountUsageHistoriesTotalQuery)
export class GetDiscountUsageHistoriesTotalHandler
  implements IQueryHandler<GetDiscountUsageHistoriesTotalQuery>
{
  constructor(private readonly service: DiscountUsageHistoryService) {}

  async execute(data: GetDiscountUsageHistoriesTotalQuery): Promise<Count> {
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
