import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { CategoryStoreEntity } from '@vg/repository/entities'
import { CategoryStoreRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(CategoryStoreEntity)
export class CategoryStoreService extends TypeOrmQueryService<CategoryStoreEntity> {
  constructor(
    private readonly repository: CategoryStoreRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
