import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { ProductLocationEntity } from '@vg/repository/entities'
import { ProductLocationRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(ProductLocationEntity)
export class ProductLocationService extends TypeOrmQueryService<ProductLocationEntity> {
  constructor(
    private readonly repository: ProductLocationRepository
  ) {
    super(repository, { useSoftDelete: true })
  }
}
