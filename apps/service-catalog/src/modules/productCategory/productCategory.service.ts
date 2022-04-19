import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductCategoryEntity } from '@vg/repository/entities'
import { ProductCategoryRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategoryEntity, ProductCategoryRepository> {
  constructor(repository: ProductCategoryRepository) {
    super(repository)
  }
}
