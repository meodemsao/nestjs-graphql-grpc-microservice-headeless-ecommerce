import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountCategoryEntity } from '@vg/repository/entities'
import { DiscountCategoryRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountCategoryService extends BaseService<
  DiscountCategoryEntity,
  DiscountCategoryRepository
> {
  constructor(repository: DiscountCategoryRepository) {
    super(repository)
  }
}
