import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { StoreEntity } from '@vg/repository/entities'
import { StoreRepository } from '@vg/repository/repositories'

@Injectable()
export class StoreService extends BaseService<StoreEntity, StoreRepository> {
  constructor(repository: StoreRepository) {
    super(repository)
  }
}
