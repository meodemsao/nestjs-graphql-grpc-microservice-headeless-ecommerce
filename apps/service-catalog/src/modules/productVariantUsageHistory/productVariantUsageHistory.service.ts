import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductVariantUsageHistoryEntity } from '@vg/repository/entities'
import { ProductVariantUsageHistoryRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductVariantUsageHistoryService extends BaseService<
  ProductVariantUsageHistoryEntity,
  ProductVariantUsageHistoryRepository
> {
  constructor(repository: ProductVariantUsageHistoryRepository) {
    super(repository)
  }
}
