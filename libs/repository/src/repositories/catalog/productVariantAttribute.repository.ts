import { EntityRepository, Repository } from 'typeorm'
import { ProductVariantAttributeEntity } from '@vg/repository/entities'

@EntityRepository(ProductVariantAttributeEntity)
export class ProductVariantAttributeRepository extends Repository<ProductVariantAttributeEntity> {}
