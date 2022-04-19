import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { CategoryEntity } from '@vg/repository/entities'
import { CategoryRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(CategoryEntity)
export class CategoryService extends TypeOrmQueryService<CategoryEntity>{
  constructor(
    private readonly catalogRepository: CategoryRepository,
  ) {
    super(catalogRepository, { useSoftDelete: true })
  }
}
