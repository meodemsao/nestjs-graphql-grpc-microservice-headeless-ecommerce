import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductEntity } from '@vg/repository/entities'
import { ProductRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductService extends BaseService<ProductEntity, ProductRepository> {
  constructor(repository: ProductRepository) {
    super(repository)
  }
}
