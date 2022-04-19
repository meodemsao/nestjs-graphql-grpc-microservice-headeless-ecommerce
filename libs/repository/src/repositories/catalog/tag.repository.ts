import { EntityRepository, Repository } from 'typeorm'
import { TagEntity } from '@vg/repository/entities'

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {
}
