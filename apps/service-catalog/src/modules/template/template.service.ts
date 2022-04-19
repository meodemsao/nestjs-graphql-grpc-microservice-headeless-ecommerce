import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { TemplateEntity } from '@vg/repository/entities'
import { TemplateRepository } from '@vg/repository/repositories'

@Injectable()
export class TemplateService extends BaseService<TemplateEntity, TemplateRepository> {
  constructor(repository: TemplateRepository) {
    super(repository)
  }
}
