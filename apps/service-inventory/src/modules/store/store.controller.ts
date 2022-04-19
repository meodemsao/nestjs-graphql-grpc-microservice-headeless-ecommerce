import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Store,
  Stores,
  CreateStoreInput,
  UpdateStoreInput
} from '@vg/proto-schema'
import {
  GetStoreQuery,
  GetStoresQuery,
  GetStoresTotalQuery
} from '@vg/service-inventory/modules/store/queries'
import {
  CreateStoreCommand,
  DeleteStoreCommand,
  UpdateStoreCommand
} from '@vg/service-inventory/modules/store/commands'

@Controller()
export class StoreController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.inventory.service, 'store')
  @Public()
  async store(request: Id, ctx: any): Promise<Store> {
    try {
      return this.queryBus.execute(new GetStoreQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * inventorys
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.inventory.service, 'stores')
  @Public()
  async stores(request: Query, ctx: any): Promise<Stores> {
    try {
      return this.queryBus.execute(new GetStoresQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.inventory.service, 'storesTotal')
  @Public()
  async storesTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetStoresTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.inventory.service, 'createStore')
  async createStore(request: CreateStoreInput, ctx: any): Promise<Store> {
    try {
      return await this.commandBus.execute(new CreateStoreCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.inventory.service, 'updateStore')
  async updateStore(request: UpdateStoreInput, ctx: any): Promise<Store> {
    try {
      return await this.commandBus.execute(new UpdateStoreCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.inventory.service, 'deleteStore')
  async deleteStore(request: Id, ctx: any): Promise<Store> {
    try {
      return await this.commandBus.execute(new DeleteStoreCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
