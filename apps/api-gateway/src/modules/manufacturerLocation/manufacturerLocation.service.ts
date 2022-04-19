import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ManufacturerLocationEntity } from '@vg/repository/entities'
import { ManufacturerLocationRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ManufacturerLocationEntity)
export class ManufacturerLocationService extends TypeOrmQueryService<ManufacturerLocationEntity> {
  constructor(
    private readonly repository: ManufacturerLocationRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
