import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { CategoryEntity } from '@vg/repository/entities'
import { CategoryRepository } from '@vg/repository/repositories'

@Injectable()
export class CategoryService extends BaseService<CategoryEntity, CategoryRepository> {
  constructor(repository: CategoryRepository) {
    super(repository)
  }

  getHello(): string {
    return 'Hello World!'
  }
}
