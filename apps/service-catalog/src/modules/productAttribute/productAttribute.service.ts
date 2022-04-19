import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductAttributeEntity } from '@vg/repository/entities'
import { ProductAttributeRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductAttributeService extends BaseService<ProductAttributeEntity, ProductAttributeRepository> {
  constructor(repository: ProductAttributeRepository) {
    super(repository)
  }
}
