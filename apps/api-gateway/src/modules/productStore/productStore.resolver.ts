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
import { ProductStoreDto } from '@vg/api-gateway/modules/productStore/dto/productStore.dto'
import {
  ProductStoreFilterArgs,
  ProductStoreInputType,
  CreateProductStoreInput,
  DeleteProductStoreInput, UpdateProductStoreInput
} from '@vg/api-gateway/modules/productStore/dto/productStore.args'

@Resolver(() => ProductStoreDto)
@Resource('ProductStore')
@UseInterceptors(AuthorizerInterceptor(ProductStoreDto))
export class ProductStoreResolver {

  @Query(() => ProductStoreDto, { nullable: true })
  @Public()
  async productStore(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductStoreDto>
  ): Promise<ProductStoreDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productStore({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductStoreDto])
  @Public()
  async productStores(
    @Context() context: GqlContext,
    @Args() args: ProductStoreFilterArgs
  ): Promise<ProductStoreDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productStores({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productStores ?? [])
  }

  @Query(() => Int)
  @Public()
  async productStoresTotal(
    @Context() context: GqlContext,
    @Args() args: ProductStoreFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productStoresTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductStoreDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductStoreInputType))
  async createProductStore(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductStoreInput
  ): Promise<ProductStoreDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductStore({ data: input?.ProductStore }, grpcContext).toPromise()

  }

  @Mutation(() => ProductStoreDto, { nullable: true })
  @Public()
  async updateProductStore(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductStoreInput
  ): Promise<ProductStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductStore(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductStoreDto, { nullable: true })
  @Public()
  async deleteProductStore(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductStoreInput
  ): Promise<ProductStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductStore(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
