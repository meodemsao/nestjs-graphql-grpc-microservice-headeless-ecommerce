import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductVariantUsageHistoryInputType } from '@vg/api-gateway/modules/productVariantUsageHistory/dto/productVariantUsageHistory.args'
import { ProductVariantUsageHistoryResolver } from '@vg/api-gateway/modules/productVariantUsageHistory/productVariantUsageHistory.resolver'
import { ProductVariantUsageHistoryDto } from '@vg/api-gateway/modules/productVariantUsageHistory/dto/productVariantUsageHistory.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ProductVariantUsageHistoryDto,
          CreateDTOClass: ProductVariantUsageHistoryInputType,
          UpdateDTOClass: ProductVariantUsageHistoryInputType
        }
      ]
    })
  ],
  providers: [ProductVariantUsageHistoryResolver]
})
export class ProductVariantUsageHistoryModule {}
