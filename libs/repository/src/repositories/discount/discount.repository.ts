import { EntityRepository, Repository } from 'typeorm'
import { DiscountEntity } from '@vg/repository/entities'

@EntityRepository(DiscountEntity)
export class DiscountRepository extends Repository<DiscountEntity> {}
