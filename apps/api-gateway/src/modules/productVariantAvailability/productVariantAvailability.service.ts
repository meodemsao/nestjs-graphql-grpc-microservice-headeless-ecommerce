import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductVariantAvailabilityEntity } from '@vg/repository/entities'
import { ProductVariantAvailabilityRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductVariantAvailabilityEntity)
export class ProductVariantAvailabilityService extends TypeOrmQueryService<ProductVariantAvailabilityEntity> {
  constructor(
    private readonly repository: ProductVariantAvailabilityRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
