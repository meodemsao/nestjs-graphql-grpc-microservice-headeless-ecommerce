import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { CategoryLocationEntity } from '@vg/repository/entities'
import { CategoryLocationRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(CategoryLocationEntity)
export class CategoryLocationService extends TypeOrmQueryService<CategoryLocationEntity> {
  constructor(
    private readonly repository: CategoryLocationRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
