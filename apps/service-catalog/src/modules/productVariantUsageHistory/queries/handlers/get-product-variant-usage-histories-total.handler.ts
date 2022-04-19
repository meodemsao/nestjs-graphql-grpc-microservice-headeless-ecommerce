import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'
import { GetProductVariantUsageHistoriesTotalQuery } from '@vg/service-catalog/modules/productVariantUsageHistory/queries'

@QueryHandler(GetProductVariantUsageHistoriesTotalQuery)
export class GetProductVariantUsageHistoriesTotalHandler
  implements IQueryHandler<GetProductVariantUsageHistoriesTotalQuery>
{
  constructor(private readonly service: ProductVariantUsageHistoryService) {}

  async execute(
    data: GetProductVariantUsageHistoriesTotalQuery
  ): Promise<Count> {
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
