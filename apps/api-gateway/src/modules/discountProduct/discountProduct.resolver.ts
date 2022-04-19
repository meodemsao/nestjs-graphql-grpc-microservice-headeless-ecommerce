import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountProductFilterArgs,
  DiscountProductInputType,
  CreateDiscountProductInput,
  DeleteDiscountProductInput,
  UpdateDiscountProductInput
} from '@vg/api-gateway/modules/discountProduct/dto/discountProduct.args'
import { DiscountProductDto } from '@vg/api-gateway/modules/discountProduct/dto/discountProduct.dto'
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

@Resolver(() => DiscountProductDto)
@Resource('DiscountProduct')
@UseInterceptors(AuthorizerInterceptor(DiscountProductDto))
export class DiscountProductResolver {
  @Query(() => DiscountProductDto, { nullable: true })
  @Public()
  async discountProduct(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<DiscountProductDto>
  ): Promise<DiscountProductDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discountProduct(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountProductDto])
  @Public()
  async discountProducts(
    @Context() context: GqlContext,
    @Args() args: DiscountProductFilterArgs
  ): Promise<DiscountProductDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discountProducts(
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

    return categories.discountProducts ?? []
  }

  @Query(() => Int)
  @Public()
  async discountProductsTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountProductFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountProductsTotal(
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
  @Mutation(() => DiscountProductDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountProductInputType)
  )
  async createDiscountProduct(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountProductInput
  ): Promise<DiscountProductDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscountProduct({ data: input?.discountProduct }, grpcContext)
      .toPromise()
  }

  @Mutation(() => DiscountProductDto, { nullable: true })
  @Public()
  async updateDiscountProduct(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountProductInput
  ): Promise<DiscountProductDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscountProduct(
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

  @Mutation(() => DiscountProductDto, { nullable: true })
  @Public()
  async deleteDiscountProduct(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountProductInput
  ): Promise<DiscountProductDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscountProduct(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
