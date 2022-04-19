import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CollectionStoreController } from './collectionStore.controller'
import { CollectionStoreRepository } from '@vg/repository/repositories'

import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'
import { CommandHandlers } from '@vg/service-catalog/modules/collectionStore/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/collectionStore/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionStoreRepository])
  ],
  controllers: [CollectionStoreController],
  providers: [
    CollectionStoreService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class CollectionStoreModule {
}
