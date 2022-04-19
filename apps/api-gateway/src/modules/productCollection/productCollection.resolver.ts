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
import { ProductCollectionDto } from '@vg/api-gateway/modules/productCollection/dto/productCollection.dto'
import {
  ProductCollectionFilterArgs,
  ProductCollectionInputType,
  CreateProductCollectionInput,
  DeleteProductCollectionInput, UpdateProductCollectionInput
} from '@vg/api-gateway/modules/productCollection/dto/productCollection.args'

@Resolver(() => ProductCollectionDto)
@Resource('ProductCollection')
@UseInterceptors(AuthorizerInterceptor(ProductCollectionDto))
export class ProductCollectionResolver {

  @Query(() => ProductCollectionDto, { nullable: true })
  @Public()
  async productCollection(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductCollectionDto>
  ): Promise<ProductCollectionDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productCollection({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductCollectionDto])
  @Public()
  async productCollections(
    @Context() context: GqlContext,
    @Args() args: ProductCollectionFilterArgs
  ): Promise<ProductCollectionDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productCollections({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productCollections ?? [])
  }

  @Query(() => Int)
  @Public()
  async productCollectionsTotal(
    @Context() context: GqlContext,
    @Args() args: ProductCollectionFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productCollectionsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductCollectionDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductCollectionInputType))
  async createProductCollection(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductCollectionInput
  ): Promise<ProductCollectionDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductCollection({ data: input?.ProductCollection }, grpcContext).toPromise()

  }

  @Mutation(() => ProductCollectionDto, { nullable: true })
  @Public()
  async updateProductCollection(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductCollectionInput
  ): Promise<ProductCollectionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductCollection(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductCollectionDto, { nullable: true })
  @Public()
  async deleteProductCollection(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductCollectionInput
  ): Promise<ProductCollectionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductCollection(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
