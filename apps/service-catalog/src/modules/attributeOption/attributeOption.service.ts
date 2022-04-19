import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { AttributeOptionEntity } from '@vg/repository/entities'
import { AttributeOptionRepository } from '@vg/repository/repositories'

@Injectable()
export class AttributeOptionService extends BaseService<
  AttributeOptionEntity,
  AttributeOptionRepository
> {
  constructor(repository: AttributeOptionRepository) {
    super(repository)
  }
}
