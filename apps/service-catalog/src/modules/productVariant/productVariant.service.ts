import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductVariantEntity } from '@vg/repository/entities'
import { ProductVariantRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductVariantService extends BaseService<
  ProductVariantEntity,
  ProductVariantRepository
> {
  constructor(repository: ProductVariantRepository) {
    super(repository)
  }
}
