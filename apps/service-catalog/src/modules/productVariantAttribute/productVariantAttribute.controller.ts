import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductVariantAttribute,
  ProductVariantAttributes,
  CreateProductVariantAttributeInput,
  UpdateProductVariantAttributeInput
} from '@vg/proto-schema'
import {
  GetProductVariantAttributeQuery,
  GetProductVariantAttributesQuery,
  GetProductVariantAttributesTotalQuery
} from '@vg/service-catalog/modules/productVariantAttribute/queries'
import {
  CreateProductVariantAttributeCommand,
  DeleteProductVariantAttributeCommand,
  UpdateProductVariantAttributeCommand
} from '@vg/service-catalog/modules/productVariantAttribute/commands'

@Controller()
export class ProductVariantAttributeController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAttribute')
  @Public()
  async productVariantAttribute(
    request: Id,
    ctx: any
  ): Promise<ProductVariantAttribute> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAttributeQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAttributes')
  @Public()
  async productVariantAttributes(
    request: Query,
    ctx: any
  ): Promise<ProductVariantAttributes> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAttributesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAttributesTotal')
  @Public()
  async productVariantAttributesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAttributesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductVariantAttribute')
  async createProductVariantAttribute(
    request: CreateProductVariantAttributeInput,
    ctx: any
  ): Promise<ProductVariantAttribute> {
    try {
      return await this.commandBus.execute(
        new CreateProductVariantAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductVariantAttribute')
  async updateProductVariantAttribute(
    request: UpdateProductVariantAttributeInput,
    ctx: any
  ): Promise<ProductVariantAttribute> {
    try {
      return await this.commandBus.execute(
        new UpdateProductVariantAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductVariantAttribute')
  async deleteProductVariantAttribute(
    request: Id,
    ctx: any
  ): Promise<ProductVariantAttribute> {
    try {
      return await this.commandBus.execute(
        new DeleteProductVariantAttributeCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
