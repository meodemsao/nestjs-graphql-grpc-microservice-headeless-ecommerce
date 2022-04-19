import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { LocationEntity } from '@vg/repository/entities'
import { LocationRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(LocationEntity)
export class LocationService extends TypeOrmQueryService<LocationEntity> {
  constructor(private readonly repository: LocationRepository) {
    super(repository, { useSoftDelete: true })
  }
}
