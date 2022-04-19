import { EntityRepository, Repository } from 'typeorm'
import { CategoryStoreEntity } from '@vg/repository/entities'

@EntityRepository(CategoryStoreEntity)
export class CategoryStoreRepository extends Repository<CategoryStoreEntity> {
}
