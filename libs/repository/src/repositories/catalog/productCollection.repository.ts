import { EntityRepository, Repository } from 'typeorm'
import { ProductCollectionEntity } from '@vg/repository/entities'

@EntityRepository(ProductCollectionEntity)
export class ProductCollectionRepository extends Repository<ProductCollectionEntity> {
}
