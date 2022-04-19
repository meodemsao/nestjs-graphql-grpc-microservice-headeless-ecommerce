import { EntityRepository, Repository } from 'typeorm'
import { AttributeEntity } from '@vg/repository/entities'

@EntityRepository(AttributeEntity)
export class AttributeRepository extends Repository<AttributeEntity> {}
