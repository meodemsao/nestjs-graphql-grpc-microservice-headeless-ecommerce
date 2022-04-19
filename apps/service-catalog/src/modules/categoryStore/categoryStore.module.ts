import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CategoryStoreController } from './categoryStore.controller'
import { CategoryStoreRepository } from '@vg/repository/repositories'

import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'
import { CommandHandlers } from '@vg/service-catalog/modules/categoryStore/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/categoryStore/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryStoreRepository])
  ],
  controllers: [CategoryStoreController],
  providers: [
    CategoryStoreService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class CategoryStoreModule {
}
