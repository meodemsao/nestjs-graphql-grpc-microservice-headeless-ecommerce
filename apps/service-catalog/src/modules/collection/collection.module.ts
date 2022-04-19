import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CollectionController } from './collection.controller'
import { CollectionRepository } from '@vg/repository/repositories'

import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'
import { CommandHandlers } from '@vg/service-catalog/modules/collection/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/collection/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionRepository])
  ],
  controllers: [CollectionController],
  providers: [
    CollectionService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class CollectionModule {
}
