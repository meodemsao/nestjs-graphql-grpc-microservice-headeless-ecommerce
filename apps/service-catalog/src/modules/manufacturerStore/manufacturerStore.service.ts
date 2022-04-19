import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ManufacturerStoreEntity } from '@vg/repository/entities'
import { ManufacturerStoreRepository } from '@vg/repository/repositories'

@Injectable()
export class ManufacturerStoreService extends BaseService<ManufacturerStoreEntity, ManufacturerStoreRepository> {
  constructor(repository: ManufacturerStoreRepository) {
    super(repository)
  }
}
