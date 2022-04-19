import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountUsageHistoryController } from './discountUsageHistory.controller'
import { DiscountUsageHistoryRepository } from '@vg/repository/repositories'

import { DiscountUsageHistoryService } from './discountUsageHistory.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountUsageHistoryRepository])],
  controllers: [DiscountUsageHistoryController],
  providers: [DiscountUsageHistoryService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountUsageHistoryModule {}
