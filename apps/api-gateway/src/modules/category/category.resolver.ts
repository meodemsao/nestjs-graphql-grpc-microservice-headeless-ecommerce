import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryDto } from '@vg/api-gateway/modules/category/dto/category.dto'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import { Public, Resource } from 'nest-keycloak-connect'
import {
  CategoryFilterArgs,
  CategoryInputType,
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput
} from '@vg/api-gateway/modules/category/dto/category.args'
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

@Resolver(() => CategoryDto)
@Resource('category')
@UseInterceptors(AuthorizerInterceptor(CategoryDto))
export class CategoryResolver {

  @Query(() => CategoryDto, { nullable: true })
  @Public()
  async category(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CategoryDto>
  ): Promise<CategoryDto> {
    const grpcContext = setRpcContext(context)
    console.log('authFilter....', authFilter)
    const result = await context.rpc.catalog.svc.category({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CategoryDto])
  @Public()
  async categories(
    @Context() context: GqlContext,
    @Args() args: CategoryFilterArgs
  ): Promise<CategoryDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc.categories({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (categories.categories ?? [])
  }

  @Query(() => Int)
  @Public()
  async categoriesTotal(
    @Context() context: GqlContext,
    @Args() args: CategoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.categoriesTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CategoryDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CategoryInputType))
  async createCategory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCategoryInput
  ): Promise<CategoryDto> {
    const grpcContext = setRpcContext(context)
    console.log('input?.category.....', input)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCategory({ data: input?.category }, grpcContext).toPromise()

  }

  @Mutation(() => CategoryDto, { nullable: true })
  @Public()
  async updateCategory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCategoryInput
  ): Promise<CategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCategory(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CategoryDto, { nullable: true })
  @Public()
  async deleteCategory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCategoryInput
  ): Promise<CategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCategory(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
