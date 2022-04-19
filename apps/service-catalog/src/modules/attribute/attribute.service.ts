import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { AttributeEntity } from '@vg/repository/entities'
import { AttributeRepository } from '@vg/repository/repositories'

@Injectable()
export class AttributeService extends BaseService<
  AttributeEntity,
  AttributeRepository
> {
  constructor(repository: AttributeRepository) {
    super(repository)
  }
}
