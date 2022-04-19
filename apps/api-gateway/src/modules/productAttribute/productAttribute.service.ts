import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductAttributeEntity } from '@vg/repository/entities'
import { ProductAttributeRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductAttributeEntity)
export class ProductAttributeService extends TypeOrmQueryService<ProductAttributeEntity> {
  constructor(
    private readonly repository: ProductAttributeRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
