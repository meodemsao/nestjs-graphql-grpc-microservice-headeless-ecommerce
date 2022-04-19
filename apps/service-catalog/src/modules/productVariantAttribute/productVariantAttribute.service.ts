import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductVariantAttributeEntity } from '@vg/repository/entities'
import { ProductVariantAttributeRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductVariantAttributeService extends BaseService<
  ProductVariantAttributeEntity,
  ProductVariantAttributeRepository
> {
  constructor(repository: ProductVariantAttributeRepository) {
    super(repository)
  }
}
