import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Collection,
  Collections,
  CreateCollectionInput, UpdateCollectionInput
} from '@vg/proto-schema'
import {
  GetCollectionQuery,
  GetCollectionsQuery, GetCollectionsTotalQuery
} from '@vg/service-catalog/modules/collection/queries'
import {
  CreateCollectionCommand, DeleteCollectionCommand,
  UpdateCollectionCommand
} from '@vg/service-catalog/modules/collection/commands'

@Controller()
export class CollectionController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collection')
  @Public()
  async collection(
    request: Id,
    ctx: any
  ): Promise<Collection> {
    try {
      return this.queryBus.execute(
        new GetCollectionQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'collections')
  @Public()
  async collections(
    request: Query,
    ctx: any
  ): Promise<Collections> {
    try {
      return this.queryBus.execute(
        new GetCollectionsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionsTotal')
  @Public()
  async collectionsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCollectionsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCollection')
  async createCollection(
    request: CreateCollectionInput,
    ctx: any
  ): Promise<Collection> {
    try {
      return await this.commandBus.execute(
        new CreateCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCollection')
  async updateCollection(
    request: UpdateCollectionInput,
    ctx: any
  ): Promise<Collection> {
    try {
      return await this.commandBus.execute(
        new UpdateCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCollection')
  async deleteCollection(
    request: Id,
    ctx: any
  ): Promise<Collection> {
    try {
      return await this.commandBus.execute(
        new DeleteCollectionCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
