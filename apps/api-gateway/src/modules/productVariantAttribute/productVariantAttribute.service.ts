import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductVariantAttributeEntity } from '@vg/repository/entities'
import { ProductVariantAttributeRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductVariantAttributeEntity)
export class ProductVariantAttributeService extends TypeOrmQueryService<ProductVariantAttributeEntity> {
  constructor(private readonly repository: ProductVariantAttributeRepository) {
    super(repository, { useSoftDelete: true })
  }
}
