import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { StoreEntity } from '@vg/repository/entities'
import { StoreRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(StoreEntity)
export class StoreService extends TypeOrmQueryService<StoreEntity> {
  constructor(private readonly repository: StoreRepository) {
    super(repository, { useSoftDelete: true })
  }
}
