import { EntityRepository, Repository } from 'typeorm'
import { CollectionLocationEntity } from '@vg/repository/entities'

@EntityRepository(CollectionLocationEntity)
export class CollectionLocationRepository extends Repository<CollectionLocationEntity> {
}
