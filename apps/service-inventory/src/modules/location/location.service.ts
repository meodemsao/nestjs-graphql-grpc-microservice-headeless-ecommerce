import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { LocationEntity } from '@vg/repository/entities'
import { LocationRepository } from '@vg/repository/repositories'

@Injectable()
export class LocationService extends BaseService<
  LocationEntity,
  LocationRepository
> {
  constructor(repository: LocationRepository) {
    super(repository)
  }
}
