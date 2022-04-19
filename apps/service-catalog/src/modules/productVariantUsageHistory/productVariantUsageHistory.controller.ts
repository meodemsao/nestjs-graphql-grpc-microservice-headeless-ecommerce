import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductVariantUsageHistory,
  ProductVariantUsageHistories,
  CreateProductVariantUsageHistoryInput,
  UpdateProductVariantUsageHistoryInput
} from '@vg/proto-schema'
import {
  GetProductVariantUsageHistoryQuery,
  GetProductVariantUsageHistoriesQuery,
  GetProductVariantUsageHistoriesTotalQuery
} from '@vg/service-catalog/modules/productVariantUsageHistory/queries'
import {
  CreateProductVariantUsageHistoryCommand,
  DeleteProductVariantUsageHistoryCommand,
  UpdateProductVariantUsageHistoryCommand
} from '@vg/service-catalog/modules/productVariantUsageHistory/commands'

@Controller()
export class ProductVariantUsageHistoryController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantUsageHistory')
  @Public()
  async productVariantUsageHistory(
    request: Id,
    ctx: any
  ): Promise<ProductVariantUsageHistory> {
    try {
      return this.queryBus.execute(
        new GetProductVariantUsageHistoryQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantUsageHistories')
  @Public()
  async productVariantUsageHistories(
    request: Query,
    ctx: any
  ): Promise<ProductVariantUsageHistories> {
    try {
      return this.queryBus.execute(
        new GetProductVariantUsageHistoriesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantUsageHistoriesTotal')
  @Public()
  async productVariantUsageHistoriesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductVariantUsageHistoriesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductVariantUsageHistory')
  async createProductVariantUsageHistory(
    request: CreateProductVariantUsageHistoryInput,
    ctx: any
  ): Promise<ProductVariantUsageHistory> {
    try {
      return await this.commandBus.execute(
        new CreateProductVariantUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductVariantUsageHistory')
  async updateProductVariantUsageHistory(
    request: UpdateProductVariantUsageHistoryInput,
    ctx: any
  ): Promise<ProductVariantUsageHistory> {
    try {
      return await this.commandBus.execute(
        new UpdateProductVariantUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductVariantUsageHistory')
  async deleteProductVariantUsageHistory(
    request: Id,
    ctx: any
  ): Promise<ProductVariantUsageHistory> {
    try {
      return await this.commandBus.execute(
        new DeleteProductVariantUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
