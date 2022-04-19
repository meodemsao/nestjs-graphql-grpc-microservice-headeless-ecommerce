import { EntityRepository, Repository } from 'typeorm'
import { ImportPriceHistoryEntity } from '@vg/repository/entities'

@EntityRepository(ImportPriceHistoryEntity)
export class ImportPriceHistoryRepository extends Repository<ImportPriceHistoryEntity> {}
