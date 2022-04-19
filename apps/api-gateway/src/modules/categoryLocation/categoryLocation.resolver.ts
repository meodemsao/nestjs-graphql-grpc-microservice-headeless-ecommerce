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
import { CategoryLocationDto } from '@vg/api-gateway/modules/categoryLocation/dto/categoryLocation.dto'
import {
  CategoryLocationFilterArgs,
  CategoryLocationInputType,
  CreateCategoryLocationInput,
  DeleteCategoryLocationInput, UpdateCategoryLocationInput
} from '@vg/api-gateway/modules/categoryLocation/dto/categoryLocation.args'

@Resolver(() => CategoryLocationDto)
@Resource('categoryLocation')
@UseInterceptors(AuthorizerInterceptor(CategoryLocationDto))
export class CategoryLocationResolver {

  @Query(() => CategoryLocationDto, { nullable: true })
  @Public()
  async categoryLocation(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CategoryLocationDto>
  ): Promise<CategoryLocationDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.categoryLocation({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CategoryLocationDto])
  @Public()
  async categoryLocations(
    @Context() context: GqlContext,
    @Args() args: CategoryLocationFilterArgs
  ): Promise<CategoryLocationDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.categoryLocations({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.categoryLocations ?? [])
  }

  @Query(() => Int)
  @Public()
  async categoryLocationsTotal(
    @Context() context: GqlContext,
    @Args() args: CategoryLocationFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.categoryLocationsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CategoryLocationDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CategoryLocationInputType))
  async createCategoryLocation(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCategoryLocationInput
  ): Promise<CategoryLocationDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCategoryLocation({ data: input?.categoryLocation }, grpcContext).toPromise()

  }

  @Mutation(() => CategoryLocationDto, { nullable: true })
  @Public()
  async updateCategoryLocation(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCategoryLocationInput
  ): Promise<CategoryLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCategoryLocation(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CategoryLocationDto, { nullable: true })
  @Public()
  async deleteCategoryLocation(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCategoryLocationInput
  ): Promise<CategoryLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCategoryLocation(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
