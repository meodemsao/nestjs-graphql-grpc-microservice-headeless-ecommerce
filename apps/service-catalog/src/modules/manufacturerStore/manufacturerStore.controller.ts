import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ManufacturerStore,
  ManufacturerStores,
  CreateManufacturerStoreInput, UpdateManufacturerStoreInput
} from '@vg/proto-schema'
import {
  GetManufacturerStoreQuery,
  GetManufacturerStoresQuery, GetManufacturerStoresTotalQuery
} from '@vg/service-catalog/modules/manufacturerStore/queries'
import {
  CreateManufacturerStoreCommand, DeleteManufacturerStoreCommand,
  UpdateManufacturerStoreCommand
} from '@vg/service-catalog/modules/manufacturerStore/commands'

@Controller()
export class ManufacturerStoreController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerStore')
  @Public()
  async manufacturerStore(
    request: Id,
    ctx: any
  ): Promise<ManufacturerStore> {
    try {
      return this.queryBus.execute(
        new GetManufacturerStoreQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerStores')
  @Public()
  async manufacturerStores(
    request: Query,
    ctx: any
  ): Promise<ManufacturerStores> {
    try {
      return this.queryBus.execute(
        new GetManufacturerStoresQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerStoresTotal')
  @Public()
  async manufacturerStoresTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetManufacturerStoresTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createManufacturerStore')
  async createManufacturerStore(
    request: CreateManufacturerStoreInput,
    ctx: any
  ): Promise<ManufacturerStore> {
    try {
      return await this.commandBus.execute(
        new CreateManufacturerStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateManufacturerStore')
  async updateManufacturerStore(
    request: UpdateManufacturerStoreInput,
    ctx: any
  ): Promise<ManufacturerStore> {
    try {
      return await this.commandBus.execute(
        new UpdateManufacturerStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteManufacturerStore')
  async deleteManufacturerStore(
    request: Id,
    ctx: any
  ): Promise<ManufacturerStore> {
    try {
      return await this.commandBus.execute(
        new DeleteManufacturerStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
