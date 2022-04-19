import { BaseService } from '@vg/repository/services/base.service'
import { Injectable } from '@nestjs/common'
import { OrderItemEntity } from '@vg/repository/entities'
import { OrderItemRepository } from '@vg/repository/repositories'

@Injectable()
export class OrderItemService extends BaseService<
  OrderItemEntity,
  OrderItemRepository
> {
  constructor(repository: OrderItemRepository) {
    super(repository)
  }
}
