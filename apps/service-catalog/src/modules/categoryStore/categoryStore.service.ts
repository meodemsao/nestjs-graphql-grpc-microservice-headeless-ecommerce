import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CategoryStoreEntity } from '@vg/repository/entities'
import { CategoryStoreRepository } from '@vg/repository/repositories'

@Injectable()
export class CategoryStoreService extends BaseService<CategoryStoreEntity, CategoryStoreRepository> {
  constructor(repository: CategoryStoreRepository) {
    super(repository)
  }
}
