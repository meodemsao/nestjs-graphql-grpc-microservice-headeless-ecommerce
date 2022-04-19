import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { LocationController } from './location.controller'
import { LocationRepository } from '@vg/repository/repositories'

import { LocationService } from '@vg/service-inventory/modules/location/location.service'
import { CommandHandlers } from '@vg/service-inventory/modules/location/commands'
import { QueryHandlers } from '@vg/service-inventory/modules/location/queries'

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  controllers: [LocationController],
  providers: [LocationService, ...CommandHandlers, ...QueryHandlers]
})
export class LocationModule {}
