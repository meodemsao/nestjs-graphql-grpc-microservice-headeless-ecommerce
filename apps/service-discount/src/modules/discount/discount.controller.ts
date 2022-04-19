import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  Discount,
  Discounts,
  CreateDiscountInput,
  UpdateDiscountInput
} from '@vg/proto-schema'
import {
  GetDiscountQuery,
  GetDiscountsQuery,
  GetDiscountsTotalQuery
} from './queries'
import {
  CreateDiscountCommand,
  DeleteDiscountCommand,
  UpdateDiscountCommand
} from './commands'

@Controller()
export class DiscountController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discount')
  @Public()
  async discount(request: Id, ctx: any): Promise<Discount> {
    try {
      return this.queryBus.execute(new GetDiscountQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'discounts')
  @Public()
  async discounts(request: Query, ctx: any): Promise<Discounts> {
    try {
      return this.queryBus.execute(new GetDiscountsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountsTotal')
  @Public()
  async discountsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetDiscountsTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscount')
  async createDiscount(
    request: CreateDiscountInput,
    ctx: any
  ): Promise<Discount> {
    try {
      return await this.commandBus.execute(new CreateDiscountCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscount')
  async updateDiscount(
    request: UpdateDiscountInput,
    ctx: any
  ): Promise<Discount> {
    try {
      return await this.commandBus.execute(new UpdateDiscountCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscount')
  async deleteDiscount(request: Id, ctx: any): Promise<Discount> {
    try {
      return await this.commandBus.execute(new DeleteDiscountCommand(request))
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
