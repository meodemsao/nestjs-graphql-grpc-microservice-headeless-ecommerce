import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ManufacturerController } from './manufacturer.controller'
import { ManufacturerRepository } from '@vg/repository/repositories'

import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'
import { CommandHandlers } from '@vg/service-catalog/modules/manufacturer/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/manufacturer/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ManufacturerRepository])
  ],
  controllers: [ManufacturerController],
  providers: [
    ManufacturerService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ManufacturerModule {
}
