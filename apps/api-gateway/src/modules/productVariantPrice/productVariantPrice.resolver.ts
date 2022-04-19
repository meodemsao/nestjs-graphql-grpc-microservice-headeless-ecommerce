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
import { ProductVariantPriceDto } from '@vg/api-gateway/modules/productVariantPrice/dto/productVariantPrice.dto'
import {
  ProductVariantPriceFilterArgs,
  ProductVariantPriceInputType,
  CreateProductVariantPriceInput,
  DeleteProductVariantPriceInput,
  UpdateProductVariantPriceInput
} from '@vg/api-gateway/modules/productVariantPrice/dto/productVariantPrice.args'

@Resolver(() => ProductVariantPriceDto)
@Resource('ProductVariantPrice')
@UseInterceptors(AuthorizerInterceptor(ProductVariantPriceDto))
export class ProductVariantPriceResolver {
  @Query(() => ProductVariantPriceDto, { nullable: true })
  @Public()
  async productVariantPrice(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ProductVariantPriceDto>
  ): Promise<ProductVariantPriceDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .productVariantPrice(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ProductVariantPriceDto])
  @Public()
  async productVariantPrices(
    @Context() context: GqlContext,
    @Args() args: ProductVariantPriceFilterArgs
  ): Promise<ProductVariantPriceDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .productVariantPrices(
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

    return categories.productVariantPrices ?? []
  }

  @Query(() => Int)
  @Public()
  async productVariantPricesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductVariantPriceFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .productVariantPricesTotal(
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
  @Mutation(() => ProductVariantPriceDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductVariantPriceInputType)
  )
  async createProductVariantPrice(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductVariantPriceInput
  ): Promise<ProductVariantPriceDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createProductVariantPrice(
        // @ts-ignore
        { data: input?.productVariantPrice },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => ProductVariantPriceDto, { nullable: true })
  @Public()
  async updateProductVariantPrice(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductVariantPriceInput
  ): Promise<ProductVariantPriceDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateProductVariantPrice(
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

  @Mutation(() => ProductVariantPriceDto, { nullable: true })
  @Public()
  async deleteProductVariantPrice(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductVariantPriceInput
  ): Promise<ProductVariantPriceDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteProductVariantPrice(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
