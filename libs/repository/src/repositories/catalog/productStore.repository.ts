import { EntityRepository, Repository } from 'typeorm'
import { ProductStoreEntity } from '@vg/repository/entities'

@EntityRepository(ProductStoreEntity)
export class ProductStoreRepository extends Repository<ProductStoreEntity> {
}
