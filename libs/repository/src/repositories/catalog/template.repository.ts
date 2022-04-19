import { EntityRepository, Repository } from 'typeorm'
import { TemplateEntity } from '@vg/repository/entities'

@EntityRepository(TemplateEntity)
export class TemplateRepository extends Repository<TemplateEntity> {
}
