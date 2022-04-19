import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { OrderItemEntity } from '@vg/repository/entities'
import { OrderItemRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(OrderItemEntity)
export class OrderItemService extends TypeOrmQueryService<OrderItemEntity> {
  constructor(private readonly repository: OrderItemRepository) {
    super(repository, { useSoftDelete: true })
  }
}
