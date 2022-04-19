import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { DiscountRequirementController } from './discountRequirement.controller'
import { DiscountRequirementRepository } from '@vg/repository/repositories'

import { DiscountRequirementService } from './discountRequirement.service'
import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([DiscountRequirementRepository])],
  controllers: [DiscountRequirementController],
  providers: [DiscountRequirementService, ...CommandHandlers, ...QueryHandlers]
})
export class DiscountRequirementModule {}
