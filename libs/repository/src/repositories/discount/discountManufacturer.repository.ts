import { EntityRepository, Repository } from 'typeorm'
import { DiscountManufacturerEntity } from '@vg/repository/entities'

@EntityRepository(DiscountManufacturerEntity)
export class DiscountManufacturerRepository extends Repository<DiscountManufacturerEntity> {}
