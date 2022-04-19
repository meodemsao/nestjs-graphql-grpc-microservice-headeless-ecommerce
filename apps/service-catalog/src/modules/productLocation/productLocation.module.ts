import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductLocationController } from './productLocation.controller'
import { ProductLocationRepository } from '@vg/repository/repositories'

import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productLocation/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productLocation/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductLocationRepository])
  ],
  controllers: [ProductLocationController],
  providers: [
    ProductLocationService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductLocationModule {
}
