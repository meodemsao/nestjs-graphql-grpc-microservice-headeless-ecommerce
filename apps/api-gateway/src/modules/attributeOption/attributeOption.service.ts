import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { AttributeOptionEntity } from '@vg/repository/entities'
import { AttributeOptionRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(AttributeOptionEntity)
export class AttributeOptionService extends TypeOrmQueryService<AttributeOptionEntity> {
  constructor(private readonly repository: AttributeOptionRepository) {
    super(repository, { useSoftDelete: true })
  }
}
