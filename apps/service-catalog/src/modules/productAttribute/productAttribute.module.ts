import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductAttributeController } from './productAttribute.controller'
import { ProductAttributeRepository } from '@vg/repository/repositories'

import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'
import { CommandHandlers } from '@vg/service-catalog/modules/productAttribute/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/productAttribute/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAttributeRepository])
  ],
  controllers: [ProductAttributeController],
  providers: [
    ProductAttributeService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ProductAttributeModule {
}
