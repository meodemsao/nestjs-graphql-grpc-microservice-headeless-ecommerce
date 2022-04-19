import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  DiscountManufacturer,
  DiscountManufacturers,
  CreateDiscountManufacturerInput,
  UpdateDiscountManufacturerInput
} from '@vg/proto-schema'
import {
  GetDiscountManufacturerQuery,
  GetDiscountManufacturersQuery,
  GetDiscountManufacturersTotalQuery
} from './queries'
import {
  CreateDiscountManufacturerCommand,
  DeleteDiscountManufacturerCommand,
  UpdateDiscountManufacturerCommand
} from './commands'

@Controller()
export class DiscountManufacturerController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountManufacturer')
  @Public()
  async discountManufacturer(
    request: Id,
    ctx: any
  ): Promise<DiscountManufacturer> {
    try {
      return this.queryBus.execute(new GetDiscountManufacturerQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'discountManufacturers')
  @Public()
  async discountManufacturers(
    request: Query,
    ctx: any
  ): Promise<DiscountManufacturers> {
    try {
      return this.queryBus.execute(new GetDiscountManufacturersQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountManufacturersTotal')
  @Public()
  async discountManufacturersTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetDiscountManufacturersTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscountManufacturer')
  async createDiscountManufacturer(
    request: CreateDiscountManufacturerInput,
    ctx: any
  ): Promise<DiscountManufacturer> {
    try {
      return await this.commandBus.execute(
        new CreateDiscountManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscountManufacturer')
  async updateDiscountManufacturer(
    request: UpdateDiscountManufacturerInput,
    ctx: any
  ): Promise<DiscountManufacturer> {
    try {
      return await this.commandBus.execute(
        new UpdateDiscountManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscountManufacturer')
  async deleteDiscountManufacturer(
    request: Id,
    ctx: any
  ): Promise<DiscountManufacturer> {
    try {
      return await this.commandBus.execute(
        new DeleteDiscountManufacturerCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
