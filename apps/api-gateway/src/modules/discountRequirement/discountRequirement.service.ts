import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountRequirementEntity } from '@vg/repository/entities'
import { DiscountRequirementRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountRequirementEntity)
export class DiscountRequirementService extends TypeOrmQueryService<DiscountRequirementEntity> {
  constructor(private readonly repository: DiscountRequirementRepository) {
    super(repository, { useSoftDelete: true })
  }
}
