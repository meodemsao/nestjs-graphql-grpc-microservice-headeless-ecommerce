import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ImportPriceHistoryEntity } from '@vg/repository/entities'
import { ImportPriceHistoryRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ImportPriceHistoryEntity)
export class ImportPriceHistoryService extends TypeOrmQueryService<ImportPriceHistoryEntity> {
  constructor(private readonly repository: ImportPriceHistoryRepository) {
    super(repository, { useSoftDelete: true })
  }
}
