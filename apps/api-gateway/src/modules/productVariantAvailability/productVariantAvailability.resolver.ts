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
import { ProductVariantAvailabilityDto } from '@vg/api-gateway/modules/productVariantAvailability/dto/productVariantAvailability.dto'
import {
  ProductVariantAvailabilityFilterArgs,
  ProductVariantAvailabilityInputType,
  CreateProductVariantAvailabilityInput,
  DeleteProductVariantAvailabilityInput,
  UpdateProductVariantAvailabilityInput
} from '@vg/api-gateway/modules/productVariantAvailability/dto/productVariantAvailability.args'

@Resolver(() => ProductVariantAvailabilityDto)
@Resource('ProductVariantAvailability')
@UseInterceptors(AuthorizerInterceptor(ProductVariantAvailabilityDto))
export class ProductVariantAvailabilityResolver {
  @Query(() => ProductVariantAvailabilityDto, { nullable: true })
  @Public()
  async productVariantAvailability(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ProductVariantAvailabilityDto>
  ): Promise<ProductVariantAvailabilityDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .productVariantAvailability(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ProductVariantAvailabilityDto])
  @Public()
  async productVariantAvailabilities(
    @Context() context: GqlContext,
    @Args() args: ProductVariantAvailabilityFilterArgs
  ): Promise<ProductVariantAvailabilityDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .productVariantAvailabilities(
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

    return categories.productVariantAvailabilities ?? []
  }

  @Query(() => Int)
  @Public()
  async productVariantAvailabilitiesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductVariantAvailabilityFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .productVariantAvailabilitiesTotal(
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
  @Mutation(() => ProductVariantAvailabilityDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(
      HookTypes.BEFORE_CREATE_ONE,
      ProductVariantAvailabilityInputType
    )
  )
  async createProductVariantAvailability(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductVariantAvailabilityInput
  ): Promise<ProductVariantAvailabilityDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createProductVariantAvailability(
        // @ts-ignore
        { data: input?.productVariantAvailability },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => ProductVariantAvailabilityDto, { nullable: true })
  @Public()
  async updateProductVariantAvailability(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductVariantAvailabilityInput
  ): Promise<ProductVariantAvailabilityDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateProductVariantAvailability(
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

  @Mutation(() => ProductVariantAvailabilityDto, { nullable: true })
  @Public()
  async deleteProductVariantAvailability(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductVariantAvailabilityInput
  ): Promise<ProductVariantAvailabilityDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteProductVariantAvailability(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
