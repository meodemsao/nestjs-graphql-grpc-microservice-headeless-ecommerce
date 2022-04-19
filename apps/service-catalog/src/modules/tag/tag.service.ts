import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { TagEntity } from '@vg/repository/entities'
import { TagRepository } from '@vg/repository/repositories'

@Injectable()
export class TagService extends BaseService<TagEntity, TagRepository> {
  constructor(repository: TagRepository) {
    super(repository)
  }
}
