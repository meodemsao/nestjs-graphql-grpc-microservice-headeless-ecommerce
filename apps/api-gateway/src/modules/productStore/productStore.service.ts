import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductStoreEntity } from '@vg/repository/entities'
import { ProductStoreRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductStoreEntity)
export class ProductStoreService extends TypeOrmQueryService<ProductStoreEntity> {
  constructor(
    private readonly repository: ProductStoreRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
