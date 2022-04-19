import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductVariantAvailabilityController } from './productVariantAvailability.controller'
import { ProductVariantAvailabilityRepository } from '@vg/repository/repositories'

import { ProductVariantAvailabilityService } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productVariantAvailability/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productVariantAvailability/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantAvailabilityRepository])],
  controllers: [ProductVariantAvailabilityController],
  providers: [
    ProductVariantAvailabilityService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class ProductVariantAvailabilityModule {}
