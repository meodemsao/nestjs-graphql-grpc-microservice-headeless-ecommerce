import { EntityRepository, Repository } from 'typeorm'
import { DiscountProductEntity } from '@vg/repository/entities'

@EntityRepository(DiscountProductEntity)
export class DiscountProductRepository extends Repository<DiscountProductEntity> {}
