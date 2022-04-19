import { EntityRepository, Repository } from 'typeorm'
import { ProductVariantPriceEntity } from '@vg/repository/entities'

@EntityRepository(ProductVariantPriceEntity)
export class ProductVariantPriceRepository extends Repository<ProductVariantPriceEntity> {}
