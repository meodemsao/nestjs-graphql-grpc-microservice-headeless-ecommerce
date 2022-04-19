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
import { ManufacturerStoreDto } from '@vg/api-gateway/modules/manufacturerStore/dto/manufacturerStore.dto'
import {
  ManufacturerStoreFilterArgs,
  ManufacturerStoreInputType,
  CreateManufacturerStoreInput,
  DeleteManufacturerStoreInput, UpdateManufacturerStoreInput
} from '@vg/api-gateway/modules/manufacturerStore/dto/manufacturerStore.args'

@Resolver(() => ManufacturerStoreDto)
@Resource('ManufacturerStore')
@UseInterceptors(AuthorizerInterceptor(ManufacturerStoreDto))
export class ManufacturerStoreResolver {

  @Query(() => ManufacturerStoreDto, { nullable: true })
  @Public()
  async manufacturerStore(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<ManufacturerStoreDto>
  ): Promise<ManufacturerStoreDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.manufacturerStore({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [ManufacturerStoreDto])
  @Public()
  async manufacturerStores(
    @Context() context: GqlContext,
    @Args() args: ManufacturerStoreFilterArgs
  ): Promise<ManufacturerStoreDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturerStores({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.manufacturerStores ?? [])
  }

  @Query(() => Int)
  @Public()
  async manufacturerStoresTotal(
    @Context() context: GqlContext,
    @Args() args: ManufacturerStoreFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.manufacturerStoresTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => ManufacturerStoreDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ManufacturerStoreInputType))
  async createManufacturerStore(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateManufacturerStoreInput
  ): Promise<ManufacturerStoreDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createManufacturerStore({ data: input?.ManufacturerStore }, grpcContext).toPromise()

  }

  @Mutation(() => ManufacturerStoreDto, { nullable: true })
  @Public()
  async updateManufacturerStore(
    @Context() context: GqlContext,
    @Args() { input }: UpdateManufacturerStoreInput
  ): Promise<ManufacturerStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateManufacturerStore(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => ManufacturerStoreDto, { nullable: true })
  @Public()
  async deleteManufacturerStore(
    @Context() context: GqlContext,
    @Args() { input }: DeleteManufacturerStoreInput
  ): Promise<ManufacturerStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteManufacturerStore(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
