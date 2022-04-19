import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { QueryService } from '@nestjs-query/core'
import { Injectable } from '@nestjs/common'
import { OrderEntity } from '@vg/repository/entities'
import { OrderRepository } from '@vg/repository/repositories'

@Injectable()
@QueryService(OrderEntity)
export class OrderService extends TypeOrmQueryService<OrderEntity> {
  constructor(private readonly repository: OrderRepository) {
    super(repository, { useSoftDelete: true })
  }
}
