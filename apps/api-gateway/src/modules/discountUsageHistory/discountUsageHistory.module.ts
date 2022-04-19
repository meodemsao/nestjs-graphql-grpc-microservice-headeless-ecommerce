import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountUsageHistoryInputType } from '@vg/api-gateway/modules/discountUsageHistory/dto/discountUsageHistory.args'
import { DiscountUsageHistoryResolver } from '@vg/api-gateway/modules/discountUsageHistory/discountUsageHistory.resolver'
import { DiscountUsageHistoryDto } from '@vg/api-gateway/modules/discountUsageHistory/dto/discountUsageHistory.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountUsageHistoryDto,
          CreateDTOClass: DiscountUsageHistoryInputType,
          UpdateDTOClass: DiscountUsageHistoryInputType
        }
      ]
    })
  ],
  providers: [DiscountUsageHistoryResolver]
})
export class DiscountUsageHistoryModule {}
