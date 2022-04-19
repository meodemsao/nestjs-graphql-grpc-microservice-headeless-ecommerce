import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ManufacturerLocationController } from './manufacturerLocation.controller'
import { ManufacturerLocationRepository } from '@vg/repository/repositories'

import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'
import { CommandHandlers } from '@vg/service-catalog/modules/manufacturerLocation/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/manufacturerLocation/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([ManufacturerLocationRepository])
  ],
  controllers: [ManufacturerLocationController],
  providers: [
    ManufacturerLocationService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class ManufacturerLocationModule {
}
