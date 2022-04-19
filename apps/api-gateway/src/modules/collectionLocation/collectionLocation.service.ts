import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { CollectionLocationEntity } from '@vg/repository/entities'
import { CollectionLocationRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(CollectionLocationEntity)
export class CollectionLocationService extends TypeOrmQueryService<CollectionLocationEntity> {
  constructor(
    private readonly repository: CollectionLocationRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
