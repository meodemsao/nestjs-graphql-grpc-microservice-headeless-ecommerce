import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductVariantUsageHistoryEntity } from '@vg/repository/entities'
import { ProductVariantUsageHistoryRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductVariantUsageHistoryEntity)
export class ProductVariantUsageHistoryService extends TypeOrmQueryService<ProductVariantUsageHistoryEntity> {
  constructor(
    private readonly repository: ProductVariantUsageHistoryRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
