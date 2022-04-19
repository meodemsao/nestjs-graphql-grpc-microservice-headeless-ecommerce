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
import { ProductVariantAttributeDto } from '@vg/api-gateway/modules/productVariantAttribute/dto/productVariantAttribute.dto'
import {
  ProductVariantAttributeFilterArgs,
  ProductVariantAttributeInputType,
  CreateProductVariantAttributeInput,
  DeleteProductVariantAttributeInput,
  UpdateProductVariantAttributeInput
} from '@vg/api-gateway/modules/productVariantAttribute/dto/productVariantAttribute.args'

@Resolver(() => ProductVariantAttributeDto)
@Resource('ProductVariantAttribute')
@UseInterceptors(AuthorizerInterceptor(ProductVariantAttributeDto))
export class ProductVariantAttributeResolver {
  @Query(() => ProductVariantAttributeDto, { nullable: true })
  @Public()
  async productVariantAttribute(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ProductVariantAttributeDto>
  ): Promise<ProductVariantAttributeDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .productVariantAttribute(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ProductVariantAttributeDto])
  @Public()
  async productVariantAttributes(
    @Context() context: GqlContext,
    @Args() args: ProductVariantAttributeFilterArgs
  ): Promise<ProductVariantAttributeDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .productVariantAttributes(
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

    return categories.productVariantAttributes ?? []
  }

  @Query(() => Int)
  @Public()
  async productVariantAttributesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductVariantAttributeFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .productVariantAttributesTotal(
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
  @Mutation(() => ProductVariantAttributeDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(
      HookTypes.BEFORE_CREATE_ONE,
      ProductVariantAttributeInputType
    )
  )
  async createProductVariantAttribute(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductVariantAttributeInput
  ): Promise<ProductVariantAttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createProductVariantAttribute(
        // @ts-ignore
        { data: input?.productVariantAttribute },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => ProductVariantAttributeDto, { nullable: true })
  @Public()
  async updateProductVariantAttribute(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductVariantAttributeInput
  ): Promise<ProductVariantAttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateProductVariantAttribute(
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

  @Mutation(() => ProductVariantAttributeDto, { nullable: true })
  @Public()
  async deleteProductVariantAttribute(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductVariantAttributeInput
  ): Promise<ProductVariantAttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteProductVariantAttribute(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
