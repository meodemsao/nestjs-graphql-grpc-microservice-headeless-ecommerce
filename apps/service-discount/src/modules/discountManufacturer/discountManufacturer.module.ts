import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountManufacturerController } from './discountManufacturer.controller'
import { DiscountManufacturerRepository } from '@vg/repository/repositories'

import { DiscountManufacturerService } from './discountManufacturer.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountManufacturerRepository])],
  controllers: [DiscountManufacturerController],
  providers: [DiscountManufacturerService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountManufacturerModule {}
