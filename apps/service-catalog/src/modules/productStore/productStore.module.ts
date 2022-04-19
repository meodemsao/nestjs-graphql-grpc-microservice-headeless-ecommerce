import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductStoreController } from './productStore.controller'
import { ProductStoreRepository } from '@vg/repository/repositories'

import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productStore/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productStore/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductStoreRepository])
  ],
  controllers: [ProductStoreController],
  providers: [
    ProductStoreService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductStoreModule {
}
