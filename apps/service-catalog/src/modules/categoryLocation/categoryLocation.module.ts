import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CategoryLocationController } from './categoryLocation.controller'
import { CategoryLocationRepository } from '@vg/repository/repositories'

import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'
import { CommandHandlers } from '@vg/service-catalog/modules/categoryLocation/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/categoryLocation/queries'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryLocationRepository])
  ],
  controllers: [CategoryLocationController],
  providers: [
    CategoryLocationService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class CategoryLocationModule {
}
