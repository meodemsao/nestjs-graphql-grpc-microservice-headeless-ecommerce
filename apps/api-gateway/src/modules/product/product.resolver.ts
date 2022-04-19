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
import { ProductDto } from '@vg/api-gateway/modules/product/dto/product.dto'
import {
  ProductFilterArgs,
  ProductInputType,
  CreateProductInput,
  DeleteProductInput, UpdateProductInput
} from '@vg/api-gateway/modules/product/dto/product.args'

@Resolver(() => ProductDto)
@Resource('Product')
@UseInterceptors(AuthorizerInterceptor(ProductDto))
export class ProductResolver {

  @Query(() => ProductDto, { nullable: true })
  @Public()
  async product(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductDto>
  ): Promise<ProductDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.product({
      id: args.id
    }, grpcContext).toPromise()
    return result.data as unknown as ProductDto
  }

  @Query(() => [ProductDto])
  @Public()
  async products(
    @Context() context: GqlContext,
    @Args() args: ProductFilterArgs
  ): Promise<ProductDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.products({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.products ?? []) as unknown as ProductDto[]
  }

  @Query(() => Int)
  @Public()
  async productsTotal(
    @Context() context: GqlContext,
    @Args() args: ProductFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductInputType))
  async createProduct(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductInput
  ): Promise<ProductDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    console.log(' input?.product............', input?.product)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProduct({ data: input?.product }, grpcContext).toPromise()

  }

  @Mutation(() => ProductDto, { nullable: true })
  @Public()
  async updateProduct(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductInput
  ): Promise<ProductDto> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.updateProduct(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()

    return result as unknown as ProductDto
  }

  @Mutation(() => ProductDto, { nullable: true })
  @Public()
  async deleteProduct(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductInput
  ): Promise<ProductDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProduct(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise() as unknown as ProductDto
  }
}
