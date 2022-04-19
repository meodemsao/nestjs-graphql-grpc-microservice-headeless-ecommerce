import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ManufacturerStoreController } from './manufacturerStore.controller'
import { ManufacturerStoreRepository } from '@vg/repository/repositories'

import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'
import { CommandHandlers } from '@vg/service-catalog/modules/manufacturerStore/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/manufacturerStore/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ManufacturerStoreRepository])
  ],
  controllers: [ManufacturerStoreController],
  providers: [
    ManufacturerStoreService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ManufacturerStoreModule {
}
