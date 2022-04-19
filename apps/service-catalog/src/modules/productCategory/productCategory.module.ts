import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductCategoryController } from './productCategory.controller'
import { ProductCategoryRepository } from '@vg/repository/repositories'

import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productCategory/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productCategory/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategoryRepository])
  ],
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductCategoryModule {
}
