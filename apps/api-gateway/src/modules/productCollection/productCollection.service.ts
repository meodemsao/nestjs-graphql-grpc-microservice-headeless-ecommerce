import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductCollectionEntity } from '@vg/repository/entities'
import { ProductCollectionRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductCollectionEntity)
export class ProductCollectionService extends TypeOrmQueryService<ProductCollectionEntity> {
  constructor(
    private readonly repository: ProductCollectionRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
