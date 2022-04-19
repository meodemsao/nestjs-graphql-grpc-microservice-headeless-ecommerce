import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountCategoryEntity } from '@vg/repository/entities'
import { DiscountCategoryRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountCategoryEntity)
export class DiscountCategoryService extends TypeOrmQueryService<DiscountCategoryEntity> {
  constructor(private readonly repository: DiscountCategoryRepository) {
    super(repository, { useSoftDelete: true })
  }
}
