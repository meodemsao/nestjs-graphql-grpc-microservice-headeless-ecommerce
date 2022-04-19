import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductAttribute,
  ProductAttributes,
  CreateProductAttributeInput, UpdateProductAttributeInput
} from '@vg/proto-schema'
import {
  GetProductAttributeQuery,
  GetProductAttributesQuery, GetProductAttributesTotalQuery
} from '@vg/service-catalog/modules/productAttribute/queries'
import {
  CreateProductAttributeCommand, DeleteProductAttributeCommand,
  UpdateProductAttributeCommand
} from '@vg/service-catalog/modules/productAttribute/commands'

@Controller()
export class ProductAttributeController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productAttribute')
  @Public()
  async productAttribute(
    request: Id,
    ctx: any
  ): Promise<ProductAttribute> {
    try {
      return this.queryBus.execute(
        new GetProductAttributeQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productAttributes')
  @Public()
  async productAttributes(
    request: Query,
    ctx: any
  ): Promise<ProductAttributes> {
    try {
      return this.queryBus.execute(
        new GetProductAttributesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productAttributesTotal')
  @Public()
  async productAttributesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductAttributesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductAttribute')
  async createProductAttribute(
    request: CreateProductAttributeInput,
    ctx: any
  ): Promise<ProductAttribute> {
    try {
      return await this.commandBus.execute(
        new CreateProductAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductAttribute')
  async updateProductAttribute(
    request: UpdateProductAttributeInput,
    ctx: any
  ): Promise<ProductAttribute> {
    try {
      return await this.commandBus.execute(
        new UpdateProductAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductAttribute')
  async deleteProductAttribute(
    request: Id,
    ctx: any
  ): Promise<ProductAttribute> {
    try {
      return await this.commandBus.execute(
        new DeleteProductAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
