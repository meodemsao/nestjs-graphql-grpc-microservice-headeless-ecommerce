import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { StoreController } from './store.controller'
import { StoreRepository } from '@vg/repository/repositories'

import { StoreService } from '@vg/service-inventory/modules/store/store.service'
import { CommandHandlers } from '@vg/service-inventory/modules/store/commands'
import { QueryHandlers } from '@vg/service-inventory/modules/store/queries'

@Module({
  imports: [TypeOrmModule.forFeature([StoreRepository])],
  controllers: [StoreController],
  providers: [StoreService, ...CommandHandlers, ...QueryHandlers]
})
export class StoreModule {}
