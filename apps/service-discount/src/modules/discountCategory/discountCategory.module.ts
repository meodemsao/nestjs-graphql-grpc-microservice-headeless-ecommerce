import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountCategoryController } from './discountCategory.controller'
import { DiscountCategoryRepository } from '@vg/repository/repositories'

import { DiscountCategoryService } from './discountCategory.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCategoryRepository])],
  controllers: [DiscountCategoryController],
  providers: [DiscountCategoryService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountCategoryModule {}
