import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CollectionLocationController } from './collectionLocation.controller'
import { CollectionLocationRepository } from '@vg/repository/repositories'

import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'
import { CommandHandlers } from '@vg/service-catalog/modules/collectionLocation/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/collectionLocation/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionLocationRepository])
  ],
  controllers: [CollectionLocationController],
  providers: [
    CollectionLocationService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class CollectionLocationModule {
}
