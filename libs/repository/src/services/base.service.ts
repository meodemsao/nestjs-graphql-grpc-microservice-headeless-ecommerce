import { DeepPartial, Repository } from 'typeorm'
import { EntityId } from 'typeorm/repository/EntityId'
import { BaseEntity } from '@vg/repository/entities'
import { IBaseService } from '@vg/repository/interfaces/baseService.interface'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { Query, SortDirection, SortField } from '@nestjs-query/core'
import { Query as QueryGrpc, Sort_SortDirection } from '@vg/proto-schema'

export class BaseService<T extends BaseEntity, R extends Repository<T>> extends TypeOrmQueryService<T> implements IBaseService<T> {
  readonly repository: R

  constructor(repository: R
  ) {
    super(repository, { useSoftDelete: true })
    this.repository = repository
  }

  find(query: Query<T>): Promise<T[]> {
    let qb = this.repository.createQueryBuilder()

    const filterQB = this.filterQueryBuilder

    qb = filterQB.applyFilter(qb, query.filter, qb.alias)

    qb = filterQB.applySorting(qb, query.sorting, qb.alias)

    qb = filterQB.applyPaging(qb, query.paging)

    return qb.getMany()
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id)
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids)
  }

  create<R extends DeepPartial<T>>(data: DeepPartial<T>): Promise<R> {
    const entities: any = this.repository.create(data)
    return this.repository.save(entities)
  }

  async update(id: EntityId, data: DeepPartial<T>): Promise<T> {
    const entities: any = this.repository.create({ ...data, id })
    return this.repository.save(entities)
  }

  async delete(id: string | number): Promise<T> {
    const entity = await this.getById(id)
    if (entity) {
      await this.repository.softDelete(id)
    }
    return entity
  }

  fromQueryGrpcToTypeorm<T>(query: QueryGrpc): Query<T> {
    if (!query) return null
    const typeormQuery: Query<T> = {}
    if (typeof query.filter === 'string') {
      typeormQuery.filter = JSON.parse(query.filter)
    }

    if (query.paging) {
      typeormQuery.paging = {
        limit: query.paging.limit ?? undefined,
        offset: query.paging.offset ?? undefined
      }
    }

    if (query.sorting?.length > 0) {
      const sorting: SortField<T>[] = []

      query.sorting.forEach(sort => {
        const sortField: SortField<T> = {
          field: sort.field as keyof T,
          direction: sort.direction === Sort_SortDirection.DESC ? SortDirection.DESC : SortDirection.DESC
        }

        sorting.push(sortField)
      })

      typeormQuery.sorting = sorting
    }

    return typeormQuery
  }
}