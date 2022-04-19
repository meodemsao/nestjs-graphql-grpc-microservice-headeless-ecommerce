import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductVariantUsageHistoryController } from './productVariantUsageHistory.controller'
import { ProductVariantUsageHistoryRepository } from '@vg/repository/repositories'

import { ProductVariantUsageHistoryService } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productVariantUsageHistory/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productVariantUsageHistory/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantUsageHistoryRepository])],
  controllers: [ProductVariantUsageHistoryController],
  providers: [
    ProductVariantUsageHistoryService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class ProductVariantUsageHistoryModule {}
