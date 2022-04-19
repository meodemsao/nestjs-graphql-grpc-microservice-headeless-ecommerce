import { EntityRepository, Repository } from 'typeorm'
import { CategoryLocationEntity } from '@vg/repository/entities'

@EntityRepository(CategoryLocationEntity)
export class CategoryLocationRepository extends Repository<CategoryLocationEntity> {
}
