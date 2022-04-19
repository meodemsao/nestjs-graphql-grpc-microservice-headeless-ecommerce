import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  CategoryStore,
  CategoryStores,
  CreateCategoryStoreInput, UpdateCategoryStoreInput
} from '@vg/proto-schema'
import {
  GetCategoryStoreQuery,
  GetCategoryStoresQuery, GetCategoryStoresTotalQuery
} from '@vg/service-catalog/modules/categoryStore/queries'
import {
  CreateCategoryStoreCommand, DeleteCategoryStoreCommand,
  UpdateCategoryStoreCommand
} from '@vg/service-catalog/modules/categoryStore/commands'

@Controller()
export class CategoryStoreController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'CategoryStore')
  @Public()
  async CategoryStore(
    request: Id,
    ctx: any
  ): Promise<CategoryStore> {
    try {
      return this.queryBus.execute(
        new GetCategoryStoreQuery(request.id)
      )
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * catalogs
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.catalog.service, 'CategoryStores')
  @Public()
  async CategoryStores(
    request: Query,
    ctx: any
  ): Promise<CategoryStores> {
    try {
      return this.queryBus.execute(
        new GetCategoryStoresQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'CategoryStoresTotal')
  @Public()
  async CategoryStoresTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCategoryStoresTotalQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create catalog
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCategoryStore')
  async createCategoryStore(
    request: CreateCategoryStoreInput,
    ctx: any
  ): Promise<CategoryStore> {
    try {
      return await this.commandBus.execute(
        new CreateCategoryStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCategoryStore')
  async updateCategoryStore(
    request: UpdateCategoryStoreInput,
    ctx: any
  ): Promise<CategoryStore> {
    try {
      return await this.commandBus.execute(
        new UpdateCategoryStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCategoryStore')
  async deleteCategoryStore(
    request: Id,
    ctx: any
  ): Promise<CategoryStore> {
    try {
      return await this.commandBus.execute(
        new DeleteCategoryStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
