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
import { CategoryStoreDto } from '@vg/api-gateway/modules/categoryStore/dto/categoryStore.dto'
import {
  CategoryStoreFilterArgs,
  CategoryStoreInputType,
  CreateCategoryStoreInput,
  DeleteCategoryStoreInput, UpdateCategoryStoreInput
} from '@vg/api-gateway/modules/categoryStore/dto/categoryStore.args'

@Resolver(() => CategoryStoreDto)
@Resource('categoryStore')
@UseInterceptors(AuthorizerInterceptor(CategoryStoreDto))
export class CategoryStoreResolver {

  @Query(() => CategoryStoreDto, { nullable: true })
  @Public()
  async categoryStore(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CategoryStoreDto>
  ): Promise<CategoryStoreDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.categoryStore({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CategoryStoreDto])
  @Public()
  async categoryStores(
    @Context() context: GqlContext,
    @Args() args: CategoryStoreFilterArgs
  ): Promise<CategoryStoreDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.categoryStores({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.CategoryStores ?? [])
  }

  @Query(() => Int)
  @Public()
  async categoryStoresTotal(
    @Context() context: GqlContext,
    @Args() args: CategoryStoreFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.categoryStoresTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CategoryStoreDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CategoryStoreInputType))
  async createCategoryStore(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCategoryStoreInput
  ): Promise<CategoryStoreDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCategoryStore({ data: input?.categoryStore }, grpcContext).toPromise()

  }

  @Mutation(() => CategoryStoreDto, { nullable: true })
  @Public()
  async updateCategoryStore(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCategoryStoreInput
  ): Promise<CategoryStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCategoryStore(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CategoryStoreDto, { nullable: true })
  @Public()
  async deleteCategoryStore(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCategoryStoreInput
  ): Promise<CategoryStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCategoryStore(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
