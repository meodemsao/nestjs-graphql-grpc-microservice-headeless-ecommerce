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
import { ProductVariantUsageHistoryDto } from '@vg/api-gateway/modules/productVariantUsageHistory/dto/productVariantUsageHistory.dto'
import {
  ProductVariantUsageHistoryFilterArgs,
  ProductVariantUsageHistoryInputType,
  CreateProductVariantUsageHistoryInput,
  DeleteProductVariantUsageHistoryInput,
  UpdateProductVariantUsageHistoryInput
} from '@vg/api-gateway/modules/productVariantUsageHistory/dto/productVariantUsageHistory.args'

@Resolver(() => ProductVariantUsageHistoryDto)
@Resource('ProductVariantUsageHistory')
@UseInterceptors(AuthorizerInterceptor(ProductVariantUsageHistoryDto))
export class ProductVariantUsageHistoryResolver {
  @Query(() => ProductVariantUsageHistoryDto, { nullable: true })
  @Public()
  async productVariantUsageHistory(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ProductVariantUsageHistoryDto>
  ): Promise<ProductVariantUsageHistoryDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .productVariantUsageHistory(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ProductVariantUsageHistoryDto])
  @Public()
  async productVariantUsageHistories(
    @Context() context: GqlContext,
    @Args() args: ProductVariantUsageHistoryFilterArgs
  ): Promise<ProductVariantUsageHistoryDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .productVariantUsageHistories(
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

    return categories.productVariantUsageHistories ?? []
  }

  @Query(() => Int)
  @Public()
  async productVariantUsageHistoriesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductVariantUsageHistoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .productVariantUsageHistoriesTotal(
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
  @Mutation(() => ProductVariantUsageHistoryDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(
      HookTypes.BEFORE_CREATE_ONE,
      ProductVariantUsageHistoryInputType
    )
  )
  async createProductVariantUsageHistory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductVariantUsageHistoryInput
  ): Promise<ProductVariantUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createProductVariantUsageHistory(
        // @ts-ignore
        { data: input?.productVariantUsageHistory },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => ProductVariantUsageHistoryDto, { nullable: true })
  @Public()
  async updateProductVariantUsageHistory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductVariantUsageHistoryInput
  ): Promise<ProductVariantUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateProductVariantUsageHistory(
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

  @Mutation(() => ProductVariantUsageHistoryDto, { nullable: true })
  @Public()
  async deleteProductVariantUsageHistory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductVariantUsageHistoryInput
  ): Promise<ProductVariantUsageHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteProductVariantUsageHistory(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
