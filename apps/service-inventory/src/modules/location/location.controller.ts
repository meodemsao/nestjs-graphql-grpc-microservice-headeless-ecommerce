import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Location,
  Locations,
  CreateLocationInput,
  UpdateLocationInput
} from '@vg/proto-schema'
import {
  GetLocationQuery,
  GetLocationsQuery,
  GetLocationsTotalQuery
} from '@vg/service-inventory/modules/location/queries'
import {
  CreateLocationCommand,
  DeleteLocationCommand,
  UpdateLocationCommand
} from '@vg/service-inventory/modules/location/commands'

@Controller()
export class LocationController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.inventory.service, 'location')
  @Public()
  async location(request: Id, ctx: any): Promise<Location> {
    try {
      return this.queryBus.execute(new GetLocationQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * inventories
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.inventory.service, 'locations')
  @Public()
  async locations(request: Query, ctx: any): Promise<Locations> {
    try {
      return this.queryBus.execute(new GetLocationsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.inventory.service, 'locationsTotal')
  @Public()
  async locationsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetLocationsTotalQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create inventory
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.inventory.service, 'createLocation')
  async createLocation(
    request: CreateLocationInput,
    ctx: any
  ): Promise<Location> {
    try {
      return await this.commandBus.execute(new CreateLocationCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.inventory.service, 'updateLocation')
  async updateLocation(
    request: UpdateLocationInput,
    ctx: any
  ): Promise<Location> {
    try {
      return await this.commandBus.execute(new UpdateLocationCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.inventory.service, 'deleteLocation')
  async deleteLocation(request: Id, ctx: any): Promise<Location> {
    try {
      return await this.commandBus.execute(new DeleteLocationCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
