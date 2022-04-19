import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountManufacturerEntity } from '@vg/repository/entities'
import { DiscountManufacturerRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountManufacturerEntity)
export class DiscountManufacturerService extends TypeOrmQueryService<DiscountManufacturerEntity> {
  constructor(private readonly repository: DiscountManufacturerRepository) {
    super(repository, { useSoftDelete: true })
  }
}
