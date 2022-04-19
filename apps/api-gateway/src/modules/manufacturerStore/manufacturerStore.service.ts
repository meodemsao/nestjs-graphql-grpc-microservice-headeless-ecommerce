import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ManufacturerStoreEntity } from '@vg/repository/entities'
import { ManufacturerStoreRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ManufacturerStoreEntity)
export class ManufacturerStoreService extends TypeOrmQueryService<ManufacturerStoreEntity> {
  constructor(
    private readonly repository: ManufacturerStoreRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
