import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductImageEntity } from '@vg/repository/entities'
import { ProductImageRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductImageEntity)
export class ProductImageService extends TypeOrmQueryService<ProductImageEntity> {
  constructor(
    private readonly repository: ProductImageRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
