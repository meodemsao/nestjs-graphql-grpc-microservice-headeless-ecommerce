import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductCollectionEntity } from '@vg/repository/entities'
import { ProductCollectionRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductCollectionService extends BaseService<ProductCollectionEntity, ProductCollectionRepository> {
  constructor(repository: ProductCollectionRepository) {
    super(repository)
  }
}
