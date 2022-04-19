import { EntityRepository, Repository } from 'typeorm'
import { StoreEntity } from '@vg/repository/entities'

@EntityRepository(StoreEntity)
export class StoreRepository extends Repository<StoreEntity> {}
