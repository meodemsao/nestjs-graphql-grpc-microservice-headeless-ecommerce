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
import { ProductImageDto } from '@vg/api-gateway/modules/productImage/dto/productImage.dto'
import {
  ProductImageFilterArgs,
  ProductImageInputType,
  CreateProductImageInput,
  DeleteProductImageInput, UpdateProductImageInput
} from '@vg/api-gateway/modules/productImage/dto/productImage.args'

@Resolver(() => ProductImageDto)
@Resource('ProductImage')
@UseInterceptors(AuthorizerInterceptor(ProductImageDto))
export class ProductImageResolver {

  @Query(() => ProductImageDto, { nullable: true })
  @Public()
  async productImage(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductImageDto>
  ): Promise<ProductImageDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productImage({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductImageDto])
  @Public()
  async productImages(
    @Context() context: GqlContext,
    @Args() args: ProductImageFilterArgs
  ): Promise<ProductImageDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productImages({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productImages ?? [])
  }

  @Query(() => Int)
  @Public()
  async productImagesTotal(
    @Context() context: GqlContext,
    @Args() args: ProductImageFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productImagesTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductImageDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductImageInputType))
  async createProductImage(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductImageInput
  ): Promise<ProductImageDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductImage({ data: input?.ProductImage }, grpcContext).toPromise()

  }

  @Mutation(() => ProductImageDto, { nullable: true })
  @Public()
  async updateProductImage(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductImageInput
  ): Promise<ProductImageDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductImage(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductImageDto, { nullable: true })
  @Public()
  async deleteProductImage(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductImageInput
  ): Promise<ProductImageDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductImage(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
