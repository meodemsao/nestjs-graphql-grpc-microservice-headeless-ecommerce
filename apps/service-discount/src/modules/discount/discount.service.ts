import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountEntity } from '@vg/repository/entities'
import { DiscountRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountService extends BaseService<
  DiscountEntity,
  DiscountRepository
> {
  constructor(repository: DiscountRepository) {
    super(repository)
  }
}
