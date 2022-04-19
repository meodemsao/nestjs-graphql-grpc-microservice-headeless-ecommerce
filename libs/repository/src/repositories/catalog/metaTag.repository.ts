import { EntityRepository, Repository } from 'typeorm'
import { MetaTagEntity } from '@vg/repository/entities'

@EntityRepository(MetaTagEntity)
export class MetaTagRepository extends Repository<MetaTagEntity> {}
