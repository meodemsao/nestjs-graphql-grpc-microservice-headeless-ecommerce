import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  DiscountRequirement,
  DiscountRequirements,
  CreateDiscountRequirementInput,
  UpdateDiscountRequirementInput
} from '@vg/proto-schema'
import {
  GetDiscountRequirementQuery,
  GetDiscountRequirementsQuery,
  GetDiscountRequirementsTotalQuery
} from './queries'
import {
  CreateDiscountRequirementCommand,
  DeleteDiscountRequirementCommand,
  UpdateDiscountRequirementCommand
} from './commands'

@Controller()
export class DiscountRequirementController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountRequirement')
  @Public()
  async discountRequirement(
    request: Id,
    ctx: any
  ): Promise<DiscountRequirement> {
    try {
      return this.queryBus.execute(new GetDiscountRequirementQuery(request.id))
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'discountRequirements')
  @Public()
  async discountRequirements(
    request: Query,
    ctx: any
  ): Promise<DiscountRequirements> {
    try {
      return this.queryBus.execute(new GetDiscountRequirementsQuery(request))
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.cart.service, 'discountRequirementsTotal')
  @Public()
  async discountRequirementsTotal(request: Query, ctx: any): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetDiscountRequirementsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.cart.service, 'createDiscountRequirement')
  async createDiscountRequirement(
    request: CreateDiscountRequirementInput,
    ctx: any
  ): Promise<DiscountRequirement> {
    try {
      return await this.commandBus.execute(
        new CreateDiscountRequirementCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'updateDiscountRequirement')
  async updateDiscountRequirement(
    request: UpdateDiscountRequirementInput,
    ctx: any
  ): Promise<DiscountRequirement> {
    try {
      return await this.commandBus.execute(
        new UpdateDiscountRequirementCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.cart.service, 'deleteDiscountRequirement')
  async deleteDiscountRequirement(
    request: Id,
    ctx: any
  ): Promise<DiscountRequirement> {
    try {
      return await this.commandBus.execute(
        new DeleteDiscountRequirementCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
