import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { OrderEntity } from '@vg/repository/entities'
import { OrderRepository } from '@vg/repository/repositories'

@Injectable()
export class OrderService extends BaseService<OrderEntity, OrderRepository> {
  constructor(repository: OrderRepository) {
    super(repository)
  }
}
