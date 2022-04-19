import { EntityRepository, Repository } from 'typeorm'
import { OrderItemEntity } from '@vg/repository/entities'

@EntityRepository(OrderItemEntity)
export class OrderItemRepository extends Repository<OrderItemEntity> {}
