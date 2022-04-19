import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductEntity } from '@vg/repository/entities'
import { ProductRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductEntity)
export class ProductService extends TypeOrmQueryService<ProductEntity> {
  constructor(
    private readonly repository: ProductRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
