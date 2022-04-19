import { EntityRepository, Repository } from 'typeorm'
import { ProductImageEntity } from '@vg/repository/entities'

@EntityRepository(ProductImageEntity)
export class ProductImageRepository extends Repository<ProductImageEntity> {
}
