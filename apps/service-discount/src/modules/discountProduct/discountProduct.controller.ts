import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  DiscountProduct,
  DiscountProducts,
  CreateDiscountProductInput,
  UpdateDiscountProductInput
} from '@vg/proto-schema'
import {
  GetDiscountProductQuery,
  GetDiscountProductsQuery,
  GetDiscountProductsTotalQuery
} from './queries'
import {
  CreateDiscountProductCommand,
  DeleteDiscountProductCommand,
  UpdateDiscountProductCommand
} from './commands'

@Controller()
export class DiscountProductController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountProduct')
  @Public()
  async discountProduct(request: Id, ctx: any): Promise<DiscountProduct> {
    try {
      return this.queryBus.execute(new GetDiscountProductQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'discountProducts')
  @Public()
  async discountProducts(request: Query, ctx: any): Promise<DiscountProducts> {
    try {
      return this.queryBus.execute(new GetDiscountProductsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountProductsTotal')
  @Public()
  async discountProductsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetDiscountProductsTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscountProduct')
  async createDiscountProduct(
    request: CreateDiscountProductInput,
    ctx: any
  ): Promise<DiscountProduct> {
    try {
      return await this.commandBus.execute(
        new CreateDiscountProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscountProduct')
  async updateDiscountProduct(
    request: UpdateDiscountProductInput,
    ctx: any
  ): Promise<DiscountProduct> {
    try {
      return await this.commandBus.execute(
        new UpdateDiscountProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscountProduct')
  async deleteDiscountProduct(request: Id, ctx: any): Promise<DiscountProduct> {
    try {
      return await this.commandBus.execute(
        new DeleteDiscountProductCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
