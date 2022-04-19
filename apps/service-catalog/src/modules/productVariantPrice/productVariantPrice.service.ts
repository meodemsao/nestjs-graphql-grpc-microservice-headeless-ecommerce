import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductVariantPriceEntity } from '@vg/repository/entities'
import { ProductVariantPriceRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductVariantPriceService extends BaseService<
  ProductVariantPriceEntity,
  ProductVariantPriceRepository
> {
  constructor(repository: ProductVariantPriceRepository) {
    super(repository)
  }
}
