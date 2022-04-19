import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ProductLocationEntity } from '@vg/repository/entities'
import { ProductLocationRepository } from '@vg/repository/repositories'

@Injectable()
export class ProductLocationService extends BaseService<ProductLocationEntity, ProductLocationRepository> {
  constructor(repository: ProductLocationRepository) {
    super(repository)
  }
}
