import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { CollectionStoreEntity } from '@vg/repository/entities'
import { CollectionStoreRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(CollectionStoreEntity)
export class CollectionStoreService extends TypeOrmQueryService<CollectionStoreEntity> {
  constructor(
    private readonly repository: CollectionStoreRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
