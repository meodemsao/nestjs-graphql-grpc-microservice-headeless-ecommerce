import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountController } from './discount.controller'
import { DiscountRepository } from '@vg/repository/repositories'

import { DiscountService } from './discount.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountRepository])],
  controllers: [DiscountController],
  providers: [DiscountService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountModule {}
