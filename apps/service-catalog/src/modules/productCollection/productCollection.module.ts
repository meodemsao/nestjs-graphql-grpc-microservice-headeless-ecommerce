import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductCollectionController } from './productCollection.controller'
import { ProductCollectionRepository } from '@vg/repository/repositories'

import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productCollection/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productCollection/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCollectionRepository])
  ],
  controllers: [ProductCollectionController],
  providers: [
    ProductCollectionService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductCollectionModule {
}
