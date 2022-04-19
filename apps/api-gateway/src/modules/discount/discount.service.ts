import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountEntity } from '@vg/repository/entities'
import { DiscountRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountEntity)
export class DiscountService extends TypeOrmQueryService<DiscountEntity> {
  constructor(private readonly repository: DiscountRepository) {
    super(repository, { useSoftDelete: true })
  }
}
