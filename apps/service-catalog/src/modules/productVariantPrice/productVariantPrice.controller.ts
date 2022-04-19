import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductVariantPrice,
  ProductVariantPrices,
  CreateProductVariantPriceInput,
  UpdateProductVariantPriceInput
} from '@vg/proto-schema'
import {
  GetProductVariantPriceQuery,
  GetProductVariantPricesQuery,
  GetProductVariantPricesTotalQuery
} from '@vg/service-catalog/modules/productVariantPrice/queries'
import {
  CreateProductVariantPriceCommand,
  DeleteProductVariantPriceCommand,
  UpdateProductVariantPriceCommand
} from '@vg/service-catalog/modules/productVariantPrice/commands'

@Controller()
export class ProductVariantPriceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantPrice')
  @Public()
  async productVariantPrice(
    request: Id,
    ctx: any
  ): Promise<ProductVariantPrice> {
    try {
      return this.queryBus.execute(new GetProductVariantPriceQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantPrices')
  @Public()
  async productVariantPrices(
    request: Query,
    ctx: any
  ): Promise<ProductVariantPrices> {
    try {
      return this.queryBus.execute(new GetProductVariantPricesQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantPricesTotal')
  @Public()
  async productVariantPricesTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductVariantPricesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductVariantPrice')
  async createProductVariantPrice(
    request: CreateProductVariantPriceInput,
    ctx: any
  ): Promise<ProductVariantPrice> {
    try {
      return await this.commandBus.execute(
        new CreateProductVariantPriceCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductVariantPrice')
  async updateProductVariantPrice(
    request: UpdateProductVariantPriceInput,
    ctx: any
  ): Promise<ProductVariantPrice> {
    try {
      return await this.commandBus.execute(
        new UpdateProductVariantPriceCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductVariantPrice')
  async deleteProductVariantPrice(
    request: Id,
    ctx: any
  ): Promise<ProductVariantPrice> {
    try {
      return await this.commandBus.execute(
        new DeleteProductVariantPriceCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
