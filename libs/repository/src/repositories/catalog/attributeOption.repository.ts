import { EntityRepository, Repository } from 'typeorm'
import { AttributeOptionEntity } from '@vg/repository/entities'

@EntityRepository(AttributeOptionEntity)
export class AttributeOptionRepository extends Repository<AttributeOptionEntity> {}
