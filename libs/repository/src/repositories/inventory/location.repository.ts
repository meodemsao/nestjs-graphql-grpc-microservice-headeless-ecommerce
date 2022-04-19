import { EntityRepository, Repository } from 'typeorm'
import { LocationEntity } from '@vg/repository/entities'

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}
