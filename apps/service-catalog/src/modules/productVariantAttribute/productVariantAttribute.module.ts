import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductVariantAttributeController } from './productVariantAttribute.controller'
import { ProductVariantAttributeRepository } from '@vg/repository/repositories'

import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productVariantAttribute/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productVariantAttribute/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantAttributeRepository])],
  controllers: [ProductVariantAttributeController],
  providers: [
    ProductVariantAttributeService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class ProductVariantAttributeModule {}
