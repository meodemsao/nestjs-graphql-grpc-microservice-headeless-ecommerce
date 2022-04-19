import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductVariantController } from './productVariant.controller'
import { ProductVariantRepository } from '@vg/repository/repositories'

import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productVariant/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productVariant/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantRepository])],
  controllers: [ProductVariantController],
  providers: [ProductVariantService, ...CommandHandlers, ...QueryHandlers]
})
export class ProductVariantModule {}
