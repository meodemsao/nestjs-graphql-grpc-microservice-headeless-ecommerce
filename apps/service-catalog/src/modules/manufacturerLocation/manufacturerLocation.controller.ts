import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ManufacturerLocation,
  ManufacturerLocations,
  CreateManufacturerLocationInput, UpdateManufacturerLocationInput
} from '@vg/proto-schema'
import {
  GetManufacturerLocationQuery,
  GetManufacturerLocationsQuery, GetManufacturerLocationsTotalQuery
} from '@vg/service-catalog/modules/manufacturerLocation/queries'
import {
  CreateManufacturerLocationCommand, DeleteManufacturerLocationCommand,
  UpdateManufacturerLocationCommand
} from '@vg/service-catalog/modules/manufacturerLocation/commands'

@Controller()
export class ManufacturerLocationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerLocation')
  @Public()
  async manufacturerLocation(
    request: Id,
    ctx: any
  ): Promise<ManufacturerLocation> {
    try {
      return this.queryBus.execute(
        new GetManufacturerLocationQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerLocations')
  @Public()
  async manufacturerLocations(
    request: Query,
    ctx: any
  ): Promise<ManufacturerLocations> {
    try {
      return this.queryBus.execute(
        new GetManufacturerLocationsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturerLocationsTotal')
  @Public()
  async manufacturerLocationsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetManufacturerLocationsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createManufacturerLocation')
  async createManufacturerLocation(
    request: CreateManufacturerLocationInput,
    ctx: any
  ): Promise<ManufacturerLocation> {
    try {
      return await this.commandBus.execute(
        new CreateManufacturerLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateManufacturerLocation')
  async updateManufacturerLocation(
    request: UpdateManufacturerLocationInput,
    ctx: any
  ): Promise<ManufacturerLocation> {
    try {
      return await this.commandBus.execute(
        new UpdateManufacturerLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteManufacturerLocation')
  async deleteManufacturerLocation(
    request: Id,
    ctx: any
  ): Promise<ManufacturerLocation> {
    try {
      return await this.commandBus.execute(
        new DeleteManufacturerLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
