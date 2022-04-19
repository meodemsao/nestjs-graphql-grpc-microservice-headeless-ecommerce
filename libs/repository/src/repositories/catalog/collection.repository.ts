import { EntityRepository, Repository } from 'typeorm'
import { CollectionEntity } from '@vg/repository/entities'

@EntityRepository(CollectionEntity)
export class CollectionRepository extends Repository<CollectionEntity> {
}
