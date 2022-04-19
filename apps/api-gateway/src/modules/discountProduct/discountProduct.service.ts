import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { DiscountProductEntity } from '@vg/repository/entities'
import { DiscountProductRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(DiscountProductEntity)
export class DiscountProductService extends TypeOrmQueryService<DiscountProductEntity> {
  constructor(private readonly repository: DiscountProductRepository) {
    super(repository, { useSoftDelete: true })
  }
}
