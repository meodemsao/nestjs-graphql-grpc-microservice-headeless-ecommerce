import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ImportPriceHistory,
  ImportPriceHistories,
  CreateImportPriceHistoryInput,
  UpdateImportPriceHistoryInput
} from '@vg/proto-schema'
import {
  GetImportPriceHistoryQuery,
  GetImportPriceHistoriesQuery,
  GetImportPriceHistoriesTotalQuery
} from '@vg/service-catalog/modules/importPriceHistory/queries'
import {
  CreateImportPriceHistoryCommand,
  DeleteImportPriceHistoryCommand,
  UpdateImportPriceHistoryCommand
} from '@vg/service-catalog/modules/importPriceHistory/commands'

@Controller()
export class ImportPriceHistoryController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.catalog.service, 'importPriceHistory')
  @Public()
  async importPriceHistory(request: Id, ctx: any): Promise<ImportPriceHistory> {
    try {
      return this.queryBus.execute(new GetImportPriceHistoryQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'importPriceHistorys')
  @Public()
  async importPriceHistorys(
    request: Query,
    ctx: any
  ): Promise<ImportPriceHistories> {
    try {
      return this.queryBus.execute(new GetImportPriceHistoriesQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'importPriceHistorysTotal')
  @Public()
  async importPriceHistorysTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetImportPriceHistoriesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createImportPriceHistory')
  async createImportPriceHistory(
    request: CreateImportPriceHistoryInput,
    ctx: any
  ): Promise<ImportPriceHistory> {
    try {
      return await this.commandBus.execute(
        new CreateImportPriceHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateImportPriceHistory')
  async updateImportPriceHistory(
    request: UpdateImportPriceHistoryInput,
    ctx: any
  ): Promise<ImportPriceHistory> {
    try {
      return await this.commandBus.execute(
        new UpdateImportPriceHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteImportPriceHistory')
  async deleteImportPriceHistory(
    request: Id,
    ctx: any
  ): Promise<ImportPriceHistory> {
    try {
      return await this.commandBus.execute(
        new DeleteImportPriceHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
