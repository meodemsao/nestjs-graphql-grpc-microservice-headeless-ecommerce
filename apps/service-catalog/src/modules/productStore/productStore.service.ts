import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductStoreEntity } from '@vg/repository/entities'
import { ProductStoreRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductStoreService extends BaseService<ProductStoreEntity, ProductStoreRepository> {
  constructor(repository: ProductStoreRepository) {
    super(repository)
  }
}
