import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductVariantAvailability,
  ProductVariantAvailabilities,
  CreateProductVariantAvailabilityInput,
  UpdateProductVariantAvailabilityInput
} from '@vg/proto-schema'
import {
  GetProductVariantAvailabilityQuery,
  GetProductVariantAvailabilitiesQuery,
  GetProductVariantAvailabilitiesTotalQuery
} from '@vg/service-catalog/modules/productVariantAvailability/queries'
import {
  CreateProductVariantAvailabilityCommand,
  DeleteProductVariantAvailabilityCommand,
  UpdateProductVariantAvailabilityCommand
} from '@vg/service-catalog/modules/productVariantAvailability/commands'

@Controller()
export class ProductVariantAvailabilityController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAvailability')
  @Public()
  async productVariantAvailability(
    request: Id,
    ctx: any
  ): Promise<ProductVariantAvailability> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAvailabilityQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAvailabilities')
  @Public()
  async productVariantAvailabilities(
    request: Query,
    ctx: any
  ): Promise<ProductVariantAvailabilities> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAvailabilitiesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productVariantAvailabilitiesTotal')
  @Public()
  async productVariantAvailabilitiesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductVariantAvailabilitiesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductVariantAvailability')
  async createProductVariantAvailability(
    request: CreateProductVariantAvailabilityInput,
    ctx: any
  ): Promise<ProductVariantAvailability> {
    try {
      return await this.commandBus.execute(
        new CreateProductVariantAvailabilityCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductVariantAvailability')
  async updateProductVariantAvailability(
    request: UpdateProductVariantAvailabilityInput,
    ctx: any
  ): Promise<ProductVariantAvailability> {
    try {
      return await this.commandBus.execute(
        new UpdateProductVariantAvailabilityCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductVariantAvailability')
  async deleteProductVariantAvailability(
    request: Id,
    ctx: any
  ): Promise<ProductVariantAvailability> {
    try {
      return await this.commandBus.execute(
        new DeleteProductVariantAvailabilityCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
