import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  DiscountUsageHistory,
  DiscountUsageHistories,
  CreateDiscountUsageHistoryInput,
  UpdateDiscountUsageHistoryInput
} from '@vg/proto-schema'
import {
  GetDiscountUsageHistoryQuery,
  GetDiscountUsageHistoriesQuery,
  GetDiscountUsageHistoriesTotalQuery
} from './queries'
import {
  CreateDiscountUsageHistoryCommand,
  DeleteDiscountUsageHistoryCommand,
  UpdateDiscountUsageHistoryCommand
} from './commands'

@Controller()
export class DiscountUsageHistoryController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountUsageHistory')
  @Public()
  async discountUsageHistory(
    request: Id,
    ctx: any
  ): Promise<DiscountUsageHistory> {
    try {
      return this.queryBus.execute(new GetDiscountUsageHistoryQuery(request.id))
    } catch (e) {
      console.log('e controller............', e)
      throw new RpcException(e)
    }
  }

  /**
   * carts
   * @param request
   * @param ctx
   */
  @GrpcMethod(SERVICE_LIST.cart.service, 'discountUsageHistories')
  @Public()
  async discountUsageHistories(
    request: Query,
    ctx: any
  ): Promise<DiscountUsageHistories> {
    try {
      return this.queryBus.execute(new GetDiscountUsageHistoriesQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountUsageHistoriesTotal')
  @Public()
  async discountUsageHistoriesTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetDiscountUsageHistoriesTotalQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  /**
   * create cart
   * @param request
   * @param ctx
   */
  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscountUsageHistory')
  async createDiscountUsageHistory(
    request: CreateDiscountUsageHistoryInput,
    ctx: any
  ): Promise<DiscountUsageHistory> {
    try {
      return await this.commandBus.execute(
        new CreateDiscountUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscountUsageHistory')
  async updateDiscountUsageHistory(
    request: UpdateDiscountUsageHistoryInput,
    ctx: any
  ): Promise<DiscountUsageHistory> {
    try {
      return await this.commandBus.execute(
        new UpdateDiscountUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscountUsageHistory')
  async deleteDiscountUsageHistory(
    request: Id,
    ctx: any
  ): Promise<DiscountUsageHistory> {
    try {
      return await this.commandBus.execute(
        new DeleteDiscountUsageHistoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
