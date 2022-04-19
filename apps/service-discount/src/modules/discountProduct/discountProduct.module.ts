import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountProductController } from './discountProduct.controller'
import { DiscountProductRepository } from '@vg/repository/repositories'

import { DiscountProductService } from './discountProduct.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountProductRepository])],
  controllers: [DiscountProductController],
  providers: [DiscountProductService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountProductModule {}
