import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  CategoryLocation,
  CategoryLocations,
  CreateCategoryLocationInput, UpdateCategoryLocationInput
} from '@vg/proto-schema'
import {
  GetCategoryLocationQuery,
  GetCategoryLocationsQuery, GetCategoryLocationsTotalQuery
} from '@vg/service-catalog/modules/categoryLocation/queries'
import {
  CreateCategoryLocationCommand, DeleteCategoryLocationCommand,
  UpdateCategoryLocationCommand
} from '@vg/service-catalog/modules/categoryLocation/commands'

@Controller()
export class CategoryLocationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'categoryLocation')
  @Public()
  async categoryLocation(
    request: Id,
    ctx: any
  ): Promise<CategoryLocation> {
    try {
      return this.queryBus.execute(
        new GetCategoryLocationQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'categoryLocations')
  @Public()
  async categoryLocations(
    request: Query,
    ctx: any
  ): Promise<CategoryLocations> {
    try {
      return this.queryBus.execute(
        new GetCategoryLocationsQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'categoryLocationsTotal')
  @Public()
  async categoryLocationsTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCategoryLocationsTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCategoryLocation')
  async createCategoryLocation(
    request: CreateCategoryLocationInput,
    ctx: any
  ): Promise<CategoryLocation> {
    try {
      return await this.commandBus.execute(
        new CreateCategoryLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCategoryLocation')
  async updateCategoryLocation(
    request: UpdateCategoryLocationInput,
    ctx: any
  ): Promise<CategoryLocation> {
    try {
      return await this.commandBus.execute(
        new UpdateCategoryLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCategoryLocation')
  async deleteCategoryLocation(
    request: Id,
    ctx: any
  ): Promise<CategoryLocation> {
    try {
      return await this.commandBus.execute(
        new DeleteCategoryLocationCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
