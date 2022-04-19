import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductController } from './product.controller'
import { ProductRepository } from '@vg/repository/repositories'

import { ProductService } from '@vg/service-catalog/modules/product/product.service'
import { CommandHandlers } from '@vg/service-catalog/modules/product/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/product/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository])
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductModule {
}
