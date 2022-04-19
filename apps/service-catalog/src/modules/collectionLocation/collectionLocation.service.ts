import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CollectionLocationEntity } from '@vg/repository/entities'
import { CollectionLocationRepository } from '@vg/repository/repositories'

@Injectable()
export class CollectionLocationService extends BaseService<CollectionLocationEntity, CollectionLocationRepository> {
  constructor(repository: CollectionLocationRepository) {
    super(repository)
  }
}
