import { EntityRepository, Repository } from 'typeorm'
import { DiscountUsageHistoryEntity } from '@vg/repository/entities'

@EntityRepository(DiscountUsageHistoryEntity)
export class DiscountUsageHistoryRepository extends Repository<DiscountUsageHistoryEntity> {}
