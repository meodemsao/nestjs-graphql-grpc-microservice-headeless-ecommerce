import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { DiscountProductEntity } from '@vg/repository/entities'
import { DiscountProductRepository } from '@vg/repository/repositories'

@Injectable()
export class DiscountProductService extends BaseService<
  DiscountProductEntity,
  DiscountProductRepository
> {
  constructor(repository: DiscountProductRepository) {
    super(repository)
  }
}
