import { EntityRepository, Repository } from 'typeorm'
import { ProductAttributeEntity } from '@vg/repository/entities'

@EntityRepository(ProductAttributeEntity)
export class ProductAttributeRepository extends Repository<ProductAttributeEntity> {
}
