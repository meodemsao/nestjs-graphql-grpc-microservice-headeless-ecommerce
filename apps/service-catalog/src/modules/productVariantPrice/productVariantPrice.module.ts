import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductVariantPriceController } from './productVariantPrice.controller'
import { ProductVariantPriceRepository } from '@vg/repository/repositories'

import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productVariantPrice/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productVariantPrice/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantPriceRepository])],
  controllers: [ProductVariantPriceController],
  providers: [ProductVariantPriceService, ...CommandHandlers, ...QueryHandlers]
})
export class ProductVariantPriceModule {}
