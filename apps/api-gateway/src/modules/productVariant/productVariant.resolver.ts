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
import { ProductVariantDto } from '@vg/api-gateway/modules/productVariant/dto/productVariant.dto'
import {
  ProductVariantFilterArgs,
  ProductVariantInputType,
  CreateProductVariantInput,
  DeleteProductVariantInput,
  UpdateProductVariantInput
} from '@vg/api-gateway/modules/productVariant/dto/productVariant.args'

@Resolver(() => ProductVariantDto)
@Resource('ProductVariant')
@UseInterceptors(AuthorizerInterceptor(ProductVariantDto))
export class ProductVariantResolver {
  @Query(() => ProductVariantDto, { nullable: true })
  @Public()
  async productVariant(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ProductVariantDto>
  ): Promise<ProductVariantDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .productVariant(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ProductVariantDto])
  @Public()
  async productVariants(
    @Context() context: GqlContext,
    @Args() args: ProductVariantFilterArgs
  ): Promise<ProductVariantDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .productVariants(
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

    return categories.productVariants ?? []
  }

  @Query(() => Int)
  @Public()
  async productVariantsTotal(
    @Context() context: GqlContext,
    @Args() args: ProductVariantFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .productVariantsTotal(
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
  @Mutation(() => ProductVariantDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductVariantInputType)
  )
  async createProductVariant(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductVariantInput
  ): Promise<ProductVariantDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createProductVariant({ data: input?.productVariant }, grpcContext)
      .toPromise()
  }

  @Mutation(() => ProductVariantDto, { nullable: true })
  @Public()
  async updateProductVariant(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductVariantInput
  ): Promise<ProductVariantDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateProductVariant(
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

  @Mutation(() => ProductVariantDto, { nullable: true })
  @Public()
  async deleteProductVariant(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductVariantInput
  ): Promise<ProductVariantDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteProductVariant(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
