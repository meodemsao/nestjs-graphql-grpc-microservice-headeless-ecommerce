import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductImageEntity } from '@vg/repository/entities'
import { ProductImageRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductImageService extends BaseService<ProductImageEntity, ProductImageRepository> {
  constructor(repository: ProductImageRepository) {
    super(repository)
  }
}
