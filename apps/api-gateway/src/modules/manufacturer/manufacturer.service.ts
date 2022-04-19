import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ManufacturerEntity } from '@vg/repository/entities'
import { ManufacturerRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ManufacturerEntity)
export class ManufacturerService extends TypeOrmQueryService<ManufacturerEntity> {
  constructor(
    private readonly repository: ManufacturerRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
