import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { TemplateEntity } from '@vg/repository/entities'
import { TemplateRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(TemplateEntity)
export class TemplateService extends TypeOrmQueryService<TemplateEntity> {
  constructor(
    private readonly repository: TemplateRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
