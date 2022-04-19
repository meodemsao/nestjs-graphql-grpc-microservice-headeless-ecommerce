import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductVariantPriceEntity } from '@vg/repository/entities'
import { ProductVariantPriceRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductVariantPriceEntity)
export class ProductVariantPriceService extends TypeOrmQueryService<ProductVariantPriceEntity> {
  constructor(private readonly repository: ProductVariantPriceRepository) {
    super(repository, { useSoftDelete: true })
  }
}
