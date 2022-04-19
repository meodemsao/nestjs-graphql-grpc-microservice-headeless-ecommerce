import { EntityRepository, Repository } from 'typeorm'
import { DiscountRequirementEntity } from '@vg/repository/entities'

@EntityRepository(DiscountRequirementEntity)
export class DiscountRequirementRepository extends Repository<DiscountRequirementEntity> {}
