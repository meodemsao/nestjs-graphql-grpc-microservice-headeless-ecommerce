import { EntityRepository, Repository } from 'typeorm'
import { ManufacturerLocationEntity } from '@vg/repository/entities'

@EntityRepository(ManufacturerLocationEntity)
export class ManufacturerLocationRepository extends Repository<ManufacturerLocationEntity> {
}
