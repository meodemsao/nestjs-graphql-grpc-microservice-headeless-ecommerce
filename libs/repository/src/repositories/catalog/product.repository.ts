import { EntityRepository, Repository } from 'typeorm'
import { ProductEntity } from '@vg/repository/entities'

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
}