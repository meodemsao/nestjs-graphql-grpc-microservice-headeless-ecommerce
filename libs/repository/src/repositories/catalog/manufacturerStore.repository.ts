import { EntityRepository, Repository } from 'typeorm'
import { ManufacturerStoreEntity } from '@vg/repository/entities'

@EntityRepository(ManufacturerStoreEntity)
export class ManufacturerStoreRepository extends Repository<ManufacturerStoreEntity> {
}
