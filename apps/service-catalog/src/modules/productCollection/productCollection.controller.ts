import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductCollection,
  ProductCollections,
  CreateProductCollectionInput, UpdateProductCollectionInput
} from '@vg/proto-schema'
import {
  GetProductCollectionQuery,
  GetProductCollectionsQuery, GetProductCollectionsTotalQuery
} from '@vg/service-catalog/modules/productCollection/queries'
import {
  CreateProductCollectionCommand, DeleteProductCollectionCommand,
  UpdateProductCollectionCommand
} from '@vg/service-catalog/modules/productCollection/commands'

@Controller()
export class ProductCollectionController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCollection')
  @Public()
  async productCollection(
    request: Id,
    ctx: any
  ): Promise<ProductCollection> {
    try {
      return this.queryBus.execute(
        new GetProductCollectionQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCollections')
  @Public()
  async productCollections(
    request: Query,
    ctx: any
  ): Promise<ProductCollections> {
    try {
      return this.queryBus.execute(
        new GetProductCollectionsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCollectionsTotal')
  @Public()
  async productCollectionsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductCollectionsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductCollection')
  async createProductCollection(
    request: CreateProductCollectionInput,
    ctx: any
  ): Promise<ProductCollection> {
    try {
      return await this.commandBus.execute(
        new CreateProductCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductCollection')
  async updateProductCollection(
    request: UpdateProductCollectionInput,
    ctx: any
  ): Promise<ProductCollection> {
    try {
      return await this.commandBus.execute(
        new UpdateProductCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductCollection')
  async deleteProductCollection(
    request: Id,
    ctx: any
  ): Promise<ProductCollection> {
    try {
      return await this.commandBus.execute(
        new DeleteProductCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
