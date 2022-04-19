import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountFilterArgs,
  DiscountInputType,
  CreateDiscountInput,
  DeleteDiscountInput,
  UpdateDiscountInput
} from '@vg/api-gateway/modules/discount/dto/discount.args'
import { DiscountDto } from '@vg/api-gateway/modules/discount/dto/discount.dto'
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

@Resolver(() => DiscountDto)
@Resource('Discount')
@UseInterceptors(AuthorizerInterceptor(DiscountDto))
export class DiscountResolver {
  @Query(() => DiscountDto, { nullable: true })
  @Public()
  async discount(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
      authFilter: Filter<DiscountDto>
  ): Promise<DiscountDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discount(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountDto])
  @Public()
  async discounts(
    @Context() context: GqlContext,
    @Args() args: DiscountFilterArgs
  ): Promise<DiscountDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discounts(
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

    return categories.discounts ?? []
  }

  @Query(() => Int)
  @Public()
  async discountsTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountsTotal(
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
  @Mutation(() => DiscountDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountInputType)
  )
  async createDiscount(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountInput
  ): Promise<DiscountDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscount({ data: input?.discount }, grpcContext)
      .toPromise()
  }

  @Mutation(() => DiscountDto, { nullable: true })
  @Public()
  async updateDiscount(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountInput
  ): Promise<DiscountDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscount(
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

  @Mutation(() => DiscountDto, { nullable: true })
  @Public()
  async deleteDiscount(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountInput
  ): Promise<DiscountDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscount(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
