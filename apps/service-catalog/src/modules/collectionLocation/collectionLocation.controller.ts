import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  CollectionLocation,
  CollectionLocations,
  CreateCollectionLocationInput, UpdateCollectionLocationInput
} from '@vg/proto-schema'
import {
  GetCollectionLocationQuery,
  GetCollectionLocationsQuery, GetCollectionLocationsTotalQuery
} from '@vg/service-catalog/modules/collectionLocation/queries'
import {
  CreateCollectionLocationCommand, DeleteCollectionLocationCommand,
  UpdateCollectionLocationCommand
} from '@vg/service-catalog/modules/collectionLocation/commands'

@Controller()
export class CollectionLocationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionLocation')
  @Public()
  async collectionLocation(
    request: Id,
    ctx: any
  ): Promise<CollectionLocation> {
    try {
      return this.queryBus.execute(
        new GetCollectionLocationQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionLocations')
  @Public()
  async collectionLocations(
    request: Query,
    ctx: any
  ): Promise<CollectionLocations> {
    try {
      return this.queryBus.execute(
        new GetCollectionLocationsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionLocationsTotal')
  @Public()
  async collectionLocationsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCollectionLocationsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCollectionLocation')
  async createCollectionLocation(
    request: CreateCollectionLocationInput,
    ctx: any
  ): Promise<CollectionLocation> {
    try {
      return await this.commandBus.execute(
        new CreateCollectionLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCollectionLocation')
  async updateCollectionLocation(
    request: UpdateCollectionLocationInput,
    ctx: any
  ): Promise<CollectionLocation> {
    try {
      return await this.commandBus.execute(
        new UpdateCollectionLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCollectionLocation')
  async deleteCollectionLocation(
    request: Id,
    ctx: any
  ): Promise<CollectionLocation> {
    try {
      return await this.commandBus.execute(
        new DeleteCollectionLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
