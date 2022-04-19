import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import {
  Categories,
  Category, CreateCategoryInput, UpdateCategoryInput
} from '@vg/proto-schema'
import { SERVICE_LIST } from '@vg/core'
import {
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateCategoryCommand
} from '@vg/service-catalog/modules/category/commands'
import {
  GetCategoriesQuery,
  GetCategoryQuery,
  GetCategoriesTotalQuery
} from '@vg/service-catalog/modules/category/queries'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'

@Controller()
export class CategoryController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'category')
  @Public()
  async category(
    request: Id,
    ctx: any
  ): Promise<Category> {
    try {
      return this.queryBus.execute(
        new GetCategoryQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'categories')
  @Public()
  async categories(
    request: Query,
    ctx: any
  ): Promise<Categories> {
    try {
      return this.queryBus.execute(
        new GetCategoriesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'categoriesTotal')
  @Public()
  async categoriesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetCategoriesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createCategory')
  async createCatalog(
    request: CreateCategoryInput,
    ctx: any
  ): Promise<Category> {
    try {
      return await this.commandBus.execute(
        new CreateCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateCategory')
  async updateCategory(
    request: UpdateCategoryInput,
    ctx: any
  ): Promise<Category> {
    try {
      return await this.commandBus.execute(
        new UpdateCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteCategory')
  async deleteCategory(
    request: Id,
    ctx: any
  ): Promise<Category> {
    try {
      return await this.commandBus.execute(
        new DeleteCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
