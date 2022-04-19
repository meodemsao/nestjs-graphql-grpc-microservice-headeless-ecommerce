import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { ImportPriceHistoryEntity } from '@vg/repository/entities'
import { ImportPriceHistoryRepository } from '@vg/repository/repositories'

@Injectable()
export class ImportPriceHistoryService extends BaseService<
  ImportPriceHistoryEntity,
  ImportPriceHistoryRepository
> {
  constructor(repository: ImportPriceHistoryRepository) {
    super(repository)
  }
}
