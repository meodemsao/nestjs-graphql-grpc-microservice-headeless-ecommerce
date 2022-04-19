import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductStore,
  ProductStores,
  CreateProductStoreInput, UpdateProductStoreInput
} from '@vg/proto-schema'
import {
  GetProductStoreQuery,
  GetProductStoresQuery, GetProductStoresTotalQuery
} from '@vg/service-catalog/modules/productStore/queries'
import {
  CreateProductStoreCommand, DeleteProductStoreCommand,
  UpdateProductStoreCommand
} from '@vg/service-catalog/modules/productStore/commands'

@Controller()
export class ProductStoreController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productStore')
  @Public()
  async productStore(
    request: Id,
    ctx: any
  ): Promise<ProductStore> {
    try {
      return this.queryBus.execute(
        new GetProductStoreQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productStores')
  @Public()
  async productStores(
    request: Query,
    ctx: any
  ): Promise<ProductStores> {
    try {
      return this.queryBus.execute(
        new GetProductStoresQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productStoresTotal')
  @Public()
  async productStoresTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductStoresTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductStore')
  async createProductStore(
    request: CreateProductStoreInput,
    ctx: any
  ): Promise<ProductStore> {
    try {
      return await this.commandBus.execute(
        new CreateProductStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductStore')
  async updateProductStore(
    request: UpdateProductStoreInput,
    ctx: any
  ): Promise<ProductStore> {
    try {
      return await this.commandBus.execute(
        new UpdateProductStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductStore')
  async deleteProductStore(
    request: Id,
    ctx: any
  ): Promise<ProductStore> {
    try {
      return await this.commandBus.execute(
        new DeleteProductStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
