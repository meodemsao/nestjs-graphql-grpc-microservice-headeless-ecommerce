import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AttributeController } from './attribute.controller'
import { AttributeRepository } from '@vg/repository/repositories'

import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'
import { CommandHandlers } from '@vg/service-catalog/modules/attribute/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/attribute/queries'

@Module({
  imports: [TypeOrmModule.forFeature([AttributeRepository])],
  controllers: [AttributeController],
  providers: [AttributeService, ...CommandHandlers, ...QueryHandlers]
})
export class AttributeModule {}
