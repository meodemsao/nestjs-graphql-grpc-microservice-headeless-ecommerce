import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Manufacturer,
  Manufacturers,
  CreateManufacturerInput, UpdateManufacturerInput
} from '@vg/proto-schema'
import {
  GetManufacturerQuery,
  GetManufacturersQuery, GetManufacturersTotalQuery
} from '@vg/service-catalog/modules/manufacturer/queries'
import {
  CreateManufacturerCommand, DeleteManufacturerCommand,
  UpdateManufacturerCommand
} from '@vg/service-catalog/modules/manufacturer/commands'

@Controller()
export class ManufacturerController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturer')
  @Public()
  async manufacturer(
    request: Id,
    ctx: any
  ): Promise<Manufacturer> {
    try {
      return this.queryBus.execute(
        new GetManufacturerQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturers')
  @Public()
  async manufacturers(
    request: Query,
    ctx: any
  ): Promise<Manufacturers> {
    try {
      return this.queryBus.execute(
        new GetManufacturersQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'manufacturersTotal')
  @Public()
  async manufacturersTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetManufacturersTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createManufacturer')
  async createManufacturer(
    request: CreateManufacturerInput,
    ctx: any
  ): Promise<Manufacturer> {
    try {
      return await this.commandBus.execute(
        new CreateManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateManufacturer')
  async updateManufacturer(
    request: UpdateManufacturerInput,
    ctx: any
  ): Promise<Manufacturer> {
    try {
      return await this.commandBus.execute(
        new UpdateManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteManufacturer')
  async deleteManufacturer(
    request: Id,
    ctx: any
  ): Promise<Manufacturer> {
    try {
      return await this.commandBus.execute(
        new DeleteManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
