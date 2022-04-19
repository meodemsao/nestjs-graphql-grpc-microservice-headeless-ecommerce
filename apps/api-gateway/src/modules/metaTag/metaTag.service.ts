import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { MetaTagEntity } from '@vg/repository/entities'
import { MetaTagRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(MetaTagEntity)
export class MetaTagService extends TypeOrmQueryService<MetaTagEntity> {
  constructor(private readonly repository: MetaTagRepository) {
    super(repository, { useSoftDelete: true })
  }
}
