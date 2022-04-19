import { EntityRepository, Repository } from 'typeorm'
import { ProductVariantUsageHistoryEntity } from '@vg/repository/entities'

@EntityRepository(ProductVariantUsageHistoryEntity)
export class ProductVariantUsageHistoryRepository extends Repository<ProductVariantUsageHistoryEntity> {}
