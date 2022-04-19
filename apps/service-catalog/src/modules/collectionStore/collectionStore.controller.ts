import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  CollectionStore,
  CollectionStores,
  CreateCollectionStoreInput, UpdateCollectionStoreInput
} from '@vg/proto-schema'
import {
  GetCollectionStoreQuery,
  GetCollectionStoresQuery, GetCollectionStoresTotalQuery
} from '@vg/service-catalog/modules/collectionStore/queries'
import {
  CreateCollectionStoreCommand, DeleteCollectionStoreCommand,
  UpdateCollectionStoreCommand
} from '@vg/service-catalog/modules/collectionStore/commands'

@Controller()
export class CollectionStoreController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionStore')
  @Public()
  async collectionStore(
    request: Id,
    ctx: any
  ): Promise<CollectionStore> {
    try {
      return this.queryBus.execute(
        new GetCollectionStoreQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionStores')
  @Public()
  async collectionStores(
    request: Query,
    ctx: any
  ): Promise<CollectionStores> {
    try {
      return this.queryBus.execute(
        new GetCollectionStoresQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'collectionStoresTotal')
  @Public()
  async collectionStoresTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCollectionStoresTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCollectionStore')
  async createCollectionStore(
    request: CreateCollectionStoreInput,
    ctx: any
  ): Promise<CollectionStore> {
    try {
      return await this.commandBus.execute(
        new CreateCollectionStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCollectionStore')
  async updateCollectionStore(
    request: UpdateCollectionStoreInput,
    ctx: any
  ): Promise<CollectionStore> {
    try {
      return await this.commandBus.execute(
        new UpdateCollectionStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCollectionStore')
  async deleteCollectionStore(
    request: Id,
    ctx: any
  ): Promise<CollectionStore> {
    try {
      return await this.commandBus.execute(
        new DeleteCollectionStoreCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
