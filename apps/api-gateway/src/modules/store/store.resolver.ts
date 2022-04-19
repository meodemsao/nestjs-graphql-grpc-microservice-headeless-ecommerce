import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  StoreFilterArgs,
  StoreInputType,
  CreateStoreInput,
  DeleteStoreInput,
  UpdateStoreInput
} from '@vg/api-gateway/modules/store/dto/store.args'
import { StoreDto } from '@vg/api-gateway/modules/store/dto/store.dto'
import { HookInterceptor } from '@vg/common/interceptors/hook.interceptor'
import { GqlContext } from '@vg/core'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'
import {
  AuthorizerFilter,
  AuthorizerInterceptor,
  HookTypes,
  MutationHookArgs,
  OperationGroup
} from '@vg/query-graphql'
import { BaseUniqueFilterArgs } from '@vg/repository/dtos/base-arg.dto'
import { Public, Resource } from 'nest-keycloak-connect'

@Resolver(() => StoreDto)
@Resource('Store')
@UseInterceptors(AuthorizerInterceptor(StoreDto))
export class StoreResolver {
  @Query(() => StoreDto, { nullable: true })
  @Public()
  async store(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<StoreDto>
  ): Promise<StoreDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.inventory.svc
      .store(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [StoreDto])
  @Public()
  async stores(
    @Context() context: GqlContext,
    @Args() args: StoreFilterArgs
  ): Promise<StoreDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.inventory.svc
      .stores(
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

    return categories.stores ?? []
  }

  @Query(() => Int)
  @Public()
  async storesTotal(
    @Context() context: GqlContext,
    @Args() args: StoreFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.inventory.svc
      .storesTotal(
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
  @Mutation(() => StoreDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, StoreInputType))
  async createStore(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateStoreInput
  ): Promise<StoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      // @ts-ignore
      .createStore({ data: input?.store }, grpcContext)
      .toPromise()
  }

  @Mutation(() => StoreDto, { nullable: true })
  @Public()
  async updateStore(
    @Context() context: GqlContext,
    @Args() { input }: UpdateStoreInput
  ): Promise<StoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      .updateStore(
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

  @Mutation(() => StoreDto, { nullable: true })
  @Public()
  async deleteStore(
    @Context() context: GqlContext,
    @Args() { input }: DeleteStoreInput
  ): Promise<StoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.inventory.svc
      .deleteStore(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
