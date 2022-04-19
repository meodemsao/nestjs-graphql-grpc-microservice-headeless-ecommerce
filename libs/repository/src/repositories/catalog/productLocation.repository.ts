import { EntityRepository, Repository } from 'typeorm'
import { ProductLocationEntity } from '@vg/repository/entities'

@EntityRepository(ProductLocationEntity)
export class ProductLocationRepository extends Repository<ProductLocationEntity> {
}
