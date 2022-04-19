import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductVariantAvailabilityEntity } from '@vg/repository/entities'
import { ProductVariantAvailabilityRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductVariantAvailabilityService extends BaseService<
  ProductVariantAvailabilityEntity,
  ProductVariantAvailabilityRepository
> {
  constructor(repository: ProductVariantAvailabilityRepository) {
    super(repository)
  }
}
