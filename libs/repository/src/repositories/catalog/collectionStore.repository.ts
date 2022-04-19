import { EntityRepository, Repository } from 'typeorm'
import { CollectionStoreEntity } from '@vg/repository/entities'

@EntityRepository(CollectionStoreEntity)
export class CollectionStoreRepository extends Repository<CollectionStoreEntity> {
}
