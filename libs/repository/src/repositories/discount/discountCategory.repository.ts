import { EntityRepository, Repository } from 'typeorm'
import { DiscountCategoryEntity } from '@vg/repository/entities'

@EntityRepository(DiscountCategoryEntity)
export class DiscountCategoryRepository extends Repository<DiscountCategoryEntity> {}
