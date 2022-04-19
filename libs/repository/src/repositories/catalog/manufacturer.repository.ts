import { EntityRepository, Repository } from 'typeorm'
import { ManufacturerEntity } from '@vg/repository/entities'

@EntityRepository(ManufacturerEntity)
export class ManufacturerRepository extends Repository<ManufacturerEntity> {
}
