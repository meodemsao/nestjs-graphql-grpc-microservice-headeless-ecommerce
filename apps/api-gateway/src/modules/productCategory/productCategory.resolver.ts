import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import { Public, Resource } from 'nest-keycloak-connect'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { UseInterceptors } from '@nestjs/common'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { Filter } from '@nestjs-query/core'
import { ProductCategoryDto } from '@vg/api-gateway/modules/productCategory/dto/productCategory.dto'
import {
  ProductCategoryFilterArgs,
  ProductCategoryInputType,
  CreateProductCategoryInput,
  DeleteProductCategoryInput, UpdateProductCategoryInput
} from '@vg/api-gateway/modules/productCategory/dto/productCategory.args'

@Resolver(() => ProductCategoryDto)
@Resource('ProductCategory')
@UseInterceptors(AuthorizerInterceptor(ProductCategoryDto))
export class ProductCategoryResolver {

  @Query(() => ProductCategoryDto, { nullable: true })
  @Public()
  async productCategory(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductCategoryDto>
  ): Promise<ProductCategoryDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productCategory({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductCategoryDto])
  @Public()
  async productCategories(
    @Context() context: GqlContext,
    @Args() args: ProductCategoryFilterArgs
  ): Promise<ProductCategoryDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productCategories({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productCategories ?? [])
  }

  @Query(() => Int)
  @Public()
  async productCategoriesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductCategoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productCategoriesTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductCategoryDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductCategoryInputType))
  async createProductCategory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductCategoryInput
  ): Promise<ProductCategoryDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductCategory({ data: input?.ProductCategory }, grpcContext).toPromise()

  }

  @Mutation(() => ProductCategoryDto, { nullable: true })
  @Public()
  async updateProductCategory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductCategoryInput
  ): Promise<ProductCategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductCategory(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductCategoryDto, { nullable: true })
  @Public()
  async deleteProductCategory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductCategoryInput
  ): Promise<ProductCategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductCategory(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
