import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CategoryLocationEntity } from '@vg/repository/entities'
import { CategoryLocationRepository } from '@vg/repository/repositories'

@Injectable()
export class CategoryLocationService extends BaseService<CategoryLocationEntity, CategoryLocationRepository> {
  constructor(repository: CategoryLocationRepository) {
    super(repository)
  }
}
