import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AttributeOptionController } from './attributeOption.controller'
import { AttributeOptionRepository } from '@vg/repository/repositories'

import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'
import { CommandHandlers } from '@vg/service-catalog/modules/attributeOption/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/attributeOption/queries'

@Module({
  imports: [TypeOrmModule.forFeature([AttributeOptionRepository])],
  controllers: [AttributeOptionController],
  providers: [AttributeOptionService, ...CommandHandlers, ...QueryHandlers]
})
export class AttributeOptionModule {}
