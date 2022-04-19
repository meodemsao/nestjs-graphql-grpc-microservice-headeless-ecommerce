import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { SERVICE_LIST } from '@vg/core'
import { Public } from 'nest-keycloak-connect'
import { Count, Id, Query } from '@vg/proto-schema/proto/common'
import {
  ProductCategory,
  ProductCategories,
  CreateProductCategoryInput, UpdateProductCategoryInput
} from '@vg/proto-schema'
import {
  GetProductCategoryQuery,
  GetProductCategoriesQuery, GetProductCategoriesTotalQuery
} from '@vg/service-catalog/modules/productCategory/queries'
import {
  CreateProductCategoryCommand, DeleteProductCategoryCommand,
  UpdateProductCategoryCommand
} from '@vg/service-catalog/modules/productCategory/commands'

@Controller()
export class ProductCategoryController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCategory')
  @Public()
  async productCategory(
    request: Id,
    ctx: any
  ): Promise<ProductCategory> {
    try {
      return this.queryBus.execute(
        new GetProductCategoryQuery(request.id)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCategories')
  @Public()
  async productCategories(
    request: Query,
    ctx: any
  ): Promise<ProductCategories> {
    try {
      return this.queryBus.execute(
        new GetProductCategoriesQuery(request)
      )
    } catch (e) {
      throw new RpcException(e)
    }
  }

  @GrpcMethod(SERVICE_LIST.catalog.service, 'productCategoriesTotal')
  @Public()
  async productCategoriesTotal(
    request: Query,
    ctx: any
  ): Promise<Count> {
    try {
      return this.queryBus.execute(
        new GetProductCategoriesTotalQuery(request)
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
  @GrpcMethod(SERVICE_LIST.catalog.service, 'createProductCategory')
  async createProductCategory(
    request: CreateProductCategoryInput,
    ctx: any
  ): Promise<ProductCategory> {
    try {
      return await this.commandBus.execute(
        new CreateProductCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'updateProductCategory')
  async updateProductCategory(
    request: UpdateProductCategoryInput,
    ctx: any
  ): Promise<ProductCategory> {
    try {
      return await this.commandBus.execute(
        new UpdateProductCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }

  @Public()
  @GrpcMethod(SERVICE_LIST.catalog.service, 'deleteProductCategory')
  async deleteProductCategory(
    request: Id,
    ctx: any
  ): Promise<ProductCategory> {
    try {
      return await this.commandBus.execute(
        new DeleteProductCategoryCommand(request)
      )
    } catch (errors) {
      throw new RpcException(errors)
    }
  }
}
