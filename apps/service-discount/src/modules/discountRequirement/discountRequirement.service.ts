import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountRequirementEntity } from '@vg/repository/entities'
import { DiscountRequirementRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountRequirementService extends BaseService<
  DiscountRequirementEntity,
  DiscountRequirementRepository
> {
  constructor(repository: DiscountRequirementRepository) {
    super(repository)
  }
}
