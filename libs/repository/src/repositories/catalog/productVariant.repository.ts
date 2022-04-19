import { EntityRepository, Repository } from 'typeorm'
import { ProductVariantEntity } from '@vg/repository/entities'

@EntityRepository(ProductVariantEntity)
export class ProductVariantRepository extends Repository<ProductVariantEntity> {}
