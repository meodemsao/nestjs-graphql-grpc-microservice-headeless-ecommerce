import { EntityId } from 'typeorm/repository/EntityId'
import { DeepPartial } from 'typeorm'
import { Query } from '@nestjs-query/core'

export interface IBaseService<T> {
  find(query: Query<T>): Promise<T[]>

  findById(id: EntityId): Promise<T>

  findByIds(id: [EntityId]): Promise<T[]>

  create<R extends DeepPartial<T>>(data: DeepPartial<T>): Promise<R>

  update(id: EntityId, data: DeepPartial<T>): Promise<T>

  delete(id: EntityId): Promise<T>
}