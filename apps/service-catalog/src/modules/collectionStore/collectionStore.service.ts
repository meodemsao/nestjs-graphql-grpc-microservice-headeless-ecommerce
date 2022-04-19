import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CollectionStoreEntity } from '@vg/repository/entities'
import { CollectionStoreRepository } from '@vg/repository/repositories'

@Injectable()
export class CollectionStoreService extends BaseService<CollectionStoreEntity, CollectionStoreRepository> {
  constructor(repository: CollectionStoreRepository) {
    super(repository)
  }
}
