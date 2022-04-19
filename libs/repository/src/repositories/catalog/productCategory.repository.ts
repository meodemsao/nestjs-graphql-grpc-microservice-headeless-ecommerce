import { EntityRepository, Repository } from 'typeorm'
import { ProductCategoryEntity } from '@vg/repository/entities'

@EntityRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends Repository<ProductCategoryEntity> {
}
