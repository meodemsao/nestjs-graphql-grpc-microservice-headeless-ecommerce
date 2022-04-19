import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'
import {
  ProductVariantUsageHistory,
  ProductVariantUsageHistories
} from '@vg/proto-schema'
import { GetProductVariantUsageHistoriesQuery } from '@vg/service-catalog/modules/productVariantUsageHistory/queries'

@QueryHandler(GetProductVariantUsageHistoriesQuery)
export class GetProductVariantUsageHistoriesHandler
  implements IQueryHandler<GetProductVariantUsageHistoriesQuery>
{
  constructor(private readonly service: ProductVariantUsageHistoryService) {}

  async execute(
    data: GetProductVariantUsageHistoriesQuery
  ): Promise<ProductVariantUsageHistories> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        productVariantUsageHistories: result as ProductVariantUsageHistory[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
