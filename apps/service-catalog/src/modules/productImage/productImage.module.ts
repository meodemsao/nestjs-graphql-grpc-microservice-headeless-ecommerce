import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductImageController } from './productImage.controller'
import { ProductImageRepository } from '@vg/repository/repositories'

import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productImage/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productImage/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImageRepository])
  ],
  controllers: [ProductImageController],
  providers: [
    ProductImageService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductImageModule {
}
