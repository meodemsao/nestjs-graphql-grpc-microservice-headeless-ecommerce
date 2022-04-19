import { EntityRepository, Repository } from 'typeorm'
import { ProductVariantAvailabilityEntity } from '@vg/repository/entities'

@EntityRepository(ProductVariantAvailabilityEntity)
export class ProductVariantAvailabilityRepository extends Repository<ProductVariantAvailabilityEntity> {}
