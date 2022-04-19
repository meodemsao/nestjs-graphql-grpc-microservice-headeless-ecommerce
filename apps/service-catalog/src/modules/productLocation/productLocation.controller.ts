import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductLocation,
  ProductLocations,
  CreateProductLocationInput, UpdateProductLocationInput
} from '@vg/proto-schema'
import {
  GetProductLocationQuery,
  GetProductLocationsQuery, GetProductLocationsTotalQuery
} from '@vg/service-catalog/modules/productLocation/queries'
import {
  CreateProductLocationCommand, DeleteProductLocationCommand,
  UpdateProductLocationCommand
} from '@vg/service-catalog/modules/productLocation/commands'

@Controller()
export class ProductLocationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productLocation')
  @Public()
  async productLocation(
    request: Id,
    ctx: any
  ): Promise<ProductLocation> {
    try {
      return this.queryBus.execute(
        new GetProductLocationQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productLocations')
  @Public()
  async productLocations(
    request: Query,
    ctx: any
  ): Promise<ProductLocations> {
    try {
      return this.queryBus.execute(
        new GetProductLocationsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productLocationsTotal')
  @Public()
  async productLocationsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductLocationsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductLocation')
  async createProductLocation(
    request: CreateProductLocationInput,
    ctx: any
  ): Promise<ProductLocation> {
    try {
      return await this.commandBus.execute(
        new CreateProductLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductLocation')
  async updateProductLocation(
    request: UpdateProductLocationInput,
    ctx: any
  ): Promise<ProductLocation> {
    try {
      return await this.commandBus.execute(
        new UpdateProductLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductLocation')
  async deleteProductLocation(
    request: Id,
    ctx: any
  ): Promise<ProductLocation> {
    try {
      return await this.commandBus.execute(
        new DeleteProductLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
