import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountUsageHistoryFilterArgs,
  DiscountUsageHistoryInputType,
  CreateDiscountUsageHistoryInput,
  DeleteDiscountUsageHistoryInput,
  UpdateDiscountUsageHistoryInput
} from '@vg/api-gateway/modules/discountUsageHistory/dto/discountUsageHistory.args'
import { DiscountUsageHistoryDto } from '@vg/api-gateway/modules/discountUsageHistory/dto/discountUsageHistory.dto'
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

@Resolver(() => DiscountUsageHistoryDto)
@Resource('DiscountUsageHistory')
@UseInterceptors(AuthorizerInterceptor(DiscountUsageHistoryDto))
export class DiscountUsageHistoryResolver {
  @Query(() => DiscountUsageHistoryDto, { nullable: true })
  @Public()
  async discountUsageHistory(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<DiscountUsageHistoryDto>
  ): Promise<DiscountUsageHistoryDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discountUsageHistory(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountUsageHistoryDto])
  @Public()
  async discountUsageHistories(
    @Context() context: GqlContext,
    @Args() args: DiscountUsageHistoryFilterArgs
  ): Promise<DiscountUsageHistoryDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discountUsageHistories(
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

    return categories.discountUsageHistories ?? []
  }

  @Query(() => Int)
  @Public()
  async discountUsageHistoriesTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountUsageHistoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountUsageHistoriesTotal(
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
  @Mutation(() => DiscountUsageHistoryDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountUsageHistoryInputType)
  )
  async createDiscountUsageHistory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountUsageHistoryInput
  ): Promise<DiscountUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscountUsageHistory(
        // @ts-ignore
        { data: input?.discountUsageHistory },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => DiscountUsageHistoryDto, { nullable: true })
  @Public()
  async updateDiscountUsageHistory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountUsageHistoryInput
  ): Promise<DiscountUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscountUsageHistory(
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

  @Mutation(() => DiscountUsageHistoryDto, { nullable: true })
  @Public()
  async deleteDiscountUsageHistory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountUsageHistoryInput
  ): Promise<DiscountUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscountUsageHistory(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
