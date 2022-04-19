import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountCategoryFilterArgs,
  DiscountCategoryInputType,
  CreateDiscountCategoryInput,
  DeleteDiscountCategoryInput,
  UpdateDiscountCategoryInput
} from '@vg/api-gateway/modules/discountCategory/dto/discountCategory.args'
import { DiscountCategoryDto } from '@vg/api-gateway/modules/discountCategory/dto/discountCategory.dto'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { Public, Resource } from 'nest-keycloak-connect'

@Resolver(() => DiscountCategoryDto)
@Resource('DiscountCategory')
@UseInterceptors(AuthorizerInterceptor(DiscountCategoryDto))
export class DiscountCategoryResolver {
  @Query(() => DiscountCategoryDto, { nullable: true })
  @Public()
  async discountCategory(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<DiscountCategoryDto>
  ): Promise<DiscountCategoryDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discountCategory(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountCategoryDto])
  @Public()
  async discountCategories(
    @Context() context: GqlContext,
    @Args() args: DiscountCategoryFilterArgs
  ): Promise<DiscountCategoryDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discountCategories(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          // @ts-ignore
          paging: args?.paging,
          // @ts-ignore
          sorting: args?.sorting
        },
        grpcContext
      )
      .toPromise()

    return categories.discountCategories ?? []
  }

  @Query(() => Int)
  @Public()
  async discountCategoriesTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountCategoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountCategoriesTotal(
        {
          filter: args?.filter ? JSON.stringify(args.filter) : null,
          paging: undefined,
          sorting: undefined
        },
        grpcContext
      )
      .toPromise()

    return result.totalCount ?? 0
  }

  @Public()
  @Mutation(() => DiscountCategoryDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountCategoryInputType)
  )
  async createDiscountCategory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountCategoryInput
  ): Promise<DiscountCategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscountCategory({ data: input?.discountCategory }, grpcContext)
      .toPromise()
  }

  @Mutation(() => DiscountCategoryDto, { nullable: true })
  @Public()
  async updateDiscountCategory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountCategoryInput
  ): Promise<DiscountCategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscountCategory(
        {
          // @ts-ignore
          id: input.id,
          // @ts-ignore
          data: input.update
        },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => DiscountCategoryDto, { nullable: true })
  @Public()
  async deleteDiscountCategory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountCategoryInput
  ): Promise<DiscountCategoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscountCategory(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
