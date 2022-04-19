import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'
import {
  ProductVariantUsageHistory,
  NullableProductVariantUsageHistory
} from '@vg/proto-schema'
import { GetProductVariantUsageHistoryQuery } from '@vg/service-catalog/modules/productVariantUsageHistory/queries'

@QueryHandler(GetProductVariantUsageHistoryQuery)
export class GetProductVariantUsageHistoryHandler
  implements IQueryHandler<GetProductVariantUsageHistoryQuery>
{
  constructor(private readonly service: ProductVariantUsageHistoryService) {}

  async execute(
    query: GetProductVariantUsageHistoryQuery
  ): Promise<NullableProductVariantUsageHistory> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ProductVariantUsageHistory,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
