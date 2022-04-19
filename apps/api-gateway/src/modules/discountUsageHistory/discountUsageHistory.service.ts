import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountUsageHistoryEntity } from '@vg/repository/entities'
import { DiscountUsageHistoryRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountUsageHistoryEntity)
export class DiscountUsageHistoryService extends TypeOrmQueryService<DiscountUsageHistoryEntity> {
  constructor(private readonly repository: DiscountUsageHistoryRepository) {
    super(repository, { useSoftDelete: true })
  }
}
