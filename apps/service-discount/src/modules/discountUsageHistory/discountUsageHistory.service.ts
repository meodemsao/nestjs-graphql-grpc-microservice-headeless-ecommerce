import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountUsageHistoryEntity } from '@vg/repository/entities'
import { DiscountUsageHistoryRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountUsageHistoryService extends BaseService<
  DiscountUsageHistoryEntity,
  DiscountUsageHistoryRepository
> {
  constructor(repository: DiscountUsageHistoryRepository) {
    super(repository)
  }
}
