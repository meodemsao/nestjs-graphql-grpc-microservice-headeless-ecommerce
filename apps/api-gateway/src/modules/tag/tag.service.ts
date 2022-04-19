import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { TagEntity } from '@vg/repository/entities'
import { TagRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(TagEntity)
export class TagService extends TypeOrmQueryService<TagEntity> {
  constructor(
    private readonly repository: TagRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
