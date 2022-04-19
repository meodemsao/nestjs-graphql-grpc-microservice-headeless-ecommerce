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
import { ProductLocationDto } from '@vg/api-gateway/modules/productLocation/dto/productLocation.dto'
import {
  ProductLocationFilterArgs,
  ProductLocationInputType,
  CreateProductLocationInput,
  DeleteProductLocationInput, UpdateProductLocationInput
} from '@vg/api-gateway/modules/productLocation/dto/productLocation.args'

@Resolver(() => ProductLocationDto)
@Resource('ProductLocation')
@UseInterceptors(AuthorizerInterceptor(ProductLocationDto))
export class ProductLocationResolver {

  @Query(() => ProductLocationDto, { nullable: true })
  @Public()
  async productLocation(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ProductLocationDto>
  ): Promise<ProductLocationDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.productLocation({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ProductLocationDto])
  @Public()
  async productLocations(
    @Context() context: GqlContext,
    @Args() args: ProductLocationFilterArgs
  ): Promise<ProductLocationDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productLocations({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.productLocations ?? [])
  }

  @Query(() => Int)
  @Public()
  async productLocationsTotal(
    @Context() context: GqlContext,
    @Args() args: ProductLocationFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.productLocationsTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ProductLocationDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ProductLocationInputType))
  async createProductLocation(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateProductLocationInput
  ): Promise<ProductLocationDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createProductLocation({ data: input?.ProductLocation }, grpcContext).toPromise()

  }

  @Mutation(() => ProductLocationDto, { nullable: true })
  @Public()
  async updateProductLocation(
    @Context() context: GqlContext,
    @Args() { input }: UpdateProductLocationInput
  ): Promise<ProductLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateProductLocation(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ProductLocationDto, { nullable: true })
  @Public()
  async deleteProductLocation(
    @Context() context: GqlContext,
    @Args() { input }: DeleteProductLocationInput
  ): Promise<ProductLocationDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteProductLocation(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
