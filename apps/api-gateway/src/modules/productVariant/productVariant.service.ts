import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductVariantEntity } from '@vg/repository/entities'
import { ProductVariantRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductVariantEntity)
export class ProductVariantService extends TypeOrmQueryService<ProductVariantEntity> {
  constructor(private readonly repository: ProductVariantRepository) {
    super(repository, { useSoftDelete: true })
  }
}
