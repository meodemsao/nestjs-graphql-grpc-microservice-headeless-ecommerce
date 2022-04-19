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
import { ProductAttributeDto } from '@vg/api-gateway/modules/productAttribute/dto/productAttribute.dto'
import {
  ProductAttributeFilterArgs,
  ProductAttributeInputType,
  CreateProductAttributeInput,
  DeleteProductAttributeInput, UpdateProductAttributeInput
} from '@vg/api-gateway/modules/productAttribute/dto/productAttribute.args'

@Resolver(() => ProductAttributeDto)
@Resource('ProductAttribute')
@UseInterceptors(AuthorizerInterceptor(ProductAttributeDto))
export class ProductAttributeResolver {

  @Query(() => ProductAttributeDto, { nullable: true })
  @Public()
  async productAttribute(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductAttributeDto>
  ): Promise<ProductAttributeDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productAttribute({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductAttributeDto])
  @Public()
  async productAttributes(
    @Context() context: GqlContext,
    @Args() args: ProductAttributeFilterArgs
  ): Promise<ProductAttributeDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productAttributes({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productAttributes ?? [])
  }

  @Query(() => Int)
  @Public()
  async productAttributesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductAttributeFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productAttributesTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductAttributeDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductAttributeInputType))
  async createProductAttribute(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductAttributeInput
  ): Promise<ProductAttributeDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductAttribute({ data: input?.ProductAttribute }, grpcContext).toPromise()

  }

  @Mutation(() => ProductAttributeDto, { nullable: true })
  @Public()
  async updateProductAttribute(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductAttributeInput
  ): Promise<ProductAttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductAttribute(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductAttributeDto, { nullable: true })
  @Public()
  async deleteProductAttribute(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductAttributeInput
  ): Promise<ProductAttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductAttribute(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
