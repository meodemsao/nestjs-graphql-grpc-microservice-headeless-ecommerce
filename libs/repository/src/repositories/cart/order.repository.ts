import { EntityRepository, Repository } from 'typeorm'
import { OrderEntity } from '@vg/repository/entities'

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {}
