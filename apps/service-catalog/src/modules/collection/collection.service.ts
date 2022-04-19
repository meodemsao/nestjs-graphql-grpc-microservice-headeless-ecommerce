import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CollectionEntity } from '@vg/repository/entities'
import { CollectionRepository } from '@vg/repository/repositories'

@Injectable()
export class CollectionService extends BaseService<CollectionEntity, CollectionRepository> {
  constructor(repository: CollectionRepository) {
    super(repository)
  }
}
