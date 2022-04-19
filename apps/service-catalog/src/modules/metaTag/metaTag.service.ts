import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { MetaTagEntity } from '@vg/repository/entities'
import { MetaTagRepository } from '@vg/repository/repositories'

@Injectable()
export class MetaTagService extends BaseService<
  MetaTagEntity,
  MetaTagRepository
> {
  constructor(repository: MetaTagRepository) {
    super(repository)
  }
}
