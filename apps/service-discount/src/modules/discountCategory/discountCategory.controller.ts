import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  DiscountCategory,
  DiscountCategories,
  CreateDiscountCategoryInput,
  UpdateDiscountCategoryInput
} from '@vg/proto-schema'
import {
  GetDiscountCategoryQuery,
  GetDiscountCategoriesQuery,
  GetDiscountCategoriesTotalQuery
} from './queries'
import {
  CreateDiscountCategoryCommand,
  DeleteDiscountCategoryCommand,
  UpdateDiscountCategoryCommand
} from './commands'

@Controller()
export class DiscountCategoryController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountCategory')
  @Public()
  async discountCategory(request: Id, ctx: any): Promise<DiscountCategory> {
    try {
      return this.queryBus.execute(new GetDiscountCategoryQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'discountCategories')
  @Public()
  async discountCategories(
    request: Query,
    ctx: any
  ): Promise<DiscountCategories> {
    try {
      return this.queryBus.execute(new GetDiscountCategoriesQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountCategoriesTotal')
  @Public()
  async discountCategoriesTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(new GetDiscountCategoriesTotalQuery(request))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscountCategory')
  async createDiscountCategory(
    request: CreateDiscountCategoryInput,
    ctx: any
  ): Promise<DiscountCategory> {
    try {
      return await this.commandBus.execute(
        new CreateDiscountCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscountCategory')
  async updateDiscountCategory(
    request: UpdateDiscountCategoryInput,
    ctx: any
  ): Promise<DiscountCategory> {
    try {
      return await this.commandBus.execute(
        new UpdateDiscountCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscountCategory')
  async deleteDiscountCategory(
    request: Id,
    ctx: any
  ): Promise<DiscountCategory> {
    try {
      return await this.commandBus.execute(
        new DeleteDiscountCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
