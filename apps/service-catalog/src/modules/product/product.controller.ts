import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Product,
  Products,
  CreateProductInput, UpdateProductInput
} from '@vg/proto-schema'
import {
  GetProductQuery,
  GetProductsQuery, GetProductsTotalQuery
} from '@vg/service-catalog/modules/product/queries'
import {
  CreateProductCommand, DeleteProductCommand,
  UpdateProductCommand
} from '@vg/service-catalog/modules/product/commands'

@Controller()
export class ProductController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'product')
  @Public()
  async product(
    request: Id,
    ctx: any
  ): Promise<Product> {
    try {
      return this.queryBus.execute(
        new GetProductQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'products')
  @Public()
  async products(
    request: Query,
    ctx: any
  ): Promise<Products> {
    try {
      return this.queryBus.execute(
        new GetProductsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productsTotal')
  @Public()
  async productsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProduct')
  async createProduct(
    request: CreateProductInput,
    ctx: any
  ): Promise<Product> {
    try {
      return await this.commandBus.execute(
        new CreateProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProduct')
  async updateProduct(
    request: UpdateProductInput,
    ctx: any
  ): Promise<Product> {
    try {
      return await this.commandBus.execute(
        new UpdateProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProduct')
  async deleteProduct(
    request: Id,
    ctx: any
  ): Promise<Product> {
    try {
      return await this.commandBus.execute(
        new DeleteProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
