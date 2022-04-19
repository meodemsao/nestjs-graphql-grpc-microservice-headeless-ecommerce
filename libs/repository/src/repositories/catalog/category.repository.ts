import { EntityRepository, Repository } from 'typeorm'
import { CategoryEntity } from '@vg/repository/entities'

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
}
