import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductImage,
  ProductImages,
  CreateProductImageInput, UpdateProductImageInput
} from '@vg/proto-schema'
import {
  GetProductImageQuery,
  GetProductImagesQuery, GetProductImagesTotalQuery
} from '@vg/service-catalog/modules/productImage/queries'
import {
  CreateProductImageCommand, DeleteProductImageCommand,
  UpdateProductImageCommand
} from '@vg/service-catalog/modules/productImage/commands'

@Controller()
export class ProductImageController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productImage')
  @Public()
  async productImage(
    request: Id,
    ctx: any
  ): Promise<ProductImage> {
    try {
      return this.queryBus.execute(
        new GetProductImageQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productImages')
  @Public()
  async productImages(
    request: Query,
    ctx: any
  ): Promise<ProductImages> {
    try {
      return this.queryBus.execute(
        new GetProductImagesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productImagesTotal')
  @Public()
  async productImagesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductImagesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductImage')
  async createProductImage(
    request: CreateProductImageInput,
    ctx: any
  ): Promise<ProductImage> {
    try {
      return await this.commandBus.execute(
        new CreateProductImageCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductImage')
  async updateProductImage(
    request: UpdateProductImageInput,
    ctx: any
  ): Promise<ProductImage> {
    try {
      return await this.commandBus.execute(
        new UpdateProductImageCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductImage')
  async deleteProductImage(
    request: Id,
    ctx: any
  ): Promise<ProductImage> {
    try {
      return await this.commandBus.execute(
        new DeleteProductImageCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
