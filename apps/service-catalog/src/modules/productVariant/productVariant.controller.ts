import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductVariant,
  ProductVariants,
  CreateProductVariantInput,
  UpdateProductVariantInput
} from '@vg/proto-schema'
import {
  GetProductVariantQuery,
  GetProductVariantsQuery,
  GetProductVariantsTotalQuery
} from '@vg/service-catalog/modules/productVariant/queries'
import {
  CreateProductVariantCommand,
  DeleteProductVariantCommand,
  UpdateProductVariantCommand
} from '@vg/service-catalog/modules/productVariant/commands'

@Controller()
export class ProductVariantController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariant')
  @Public()
  async productVariant(request: Id, ctx: any): Promise<ProductVariant> {
    try {
      return this.queryBus.execute(new GetProductVariantQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariants')
  @Public()
  async productVariants(request: Query, ctx: any): Promise<ProductVariants> {
    try {
      return this.queryBus.execute(new GetProductVariantsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantsTotal')
  @Public()
  async productVariantsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetProductVariantsTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductVariant')
  async createProductVariant(
    request: CreateProductVariantInput,
    ctx: any
  ): Promise<ProductVariant> {
    try {
      return await this.commandBus.execute(
        new CreateProductVariantCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductVariant')
  async updateProductVariant(
    request: UpdateProductVariantInput,
    ctx: any
  ): Promise<ProductVariant> {
    try {
      return await this.commandBus.execute(
        new UpdateProductVariantCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductVariant')
  async deleteProductVariant(request: Id, ctx: any): Promise<ProductVariant> {
    try {
      return await this.commandBus.execute(
        new DeleteProductVariantCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
