import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ImportPriceHistoryController } from './importPriceHistory.controller'
import { ImportPriceHistoryRepository } from '@vg/repository/repositories'

import { ImportPriceHistoryService } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.service'
import { CommandHandlers } from '@vg/service-catalog/modules/importPriceHistory/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/importPriceHistory/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ImportPriceHistoryRepository])],
  controllers: [ImportPriceHistoryController],
  providers: [ImportPriceHistoryService, ...CommandHandlers, ...QueryHandlers]
})
export class ImportPriceHistoryModule {}
