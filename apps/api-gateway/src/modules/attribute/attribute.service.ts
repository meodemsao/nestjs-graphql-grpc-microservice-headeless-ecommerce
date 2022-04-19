import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { AttributeEntity } from '@vg/repository/entities'
import { AttributeRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(AttributeEntity)
export class AttributeService extends TypeOrmQueryService<AttributeEntity> {
  constructor(private readonly repository: AttributeRepository) {
    super(repository, { useSoftDelete: true })
  }
}
