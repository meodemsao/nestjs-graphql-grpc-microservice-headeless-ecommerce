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
import { CollectionStoreDto } from '@vg/api-gateway/modules/collectionStore/dto/collectionStore.dto'
import {
  CollectionStoreFilterArgs,
  CollectionStoreInputType,
  CreateCollectionStoreInput,
  DeleteCollectionStoreInput, UpdateCollectionStoreInput
} from '@vg/api-gateway/modules/collectionStore/dto/collectionStore.args'

@Resolver(() => CollectionStoreDto)
@Resource('CollectionStore')
@UseInterceptors(AuthorizerInterceptor(CollectionStoreDto))
export class CollectionStoreResolver {

  @Query(() => CollectionStoreDto, { nullable: true })
  @Public()
  async collectionStore(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    }) authFilter: Filter<CollectionStoreDto>
  ): Promise<CollectionStoreDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc.collectionStore({
      id: args.id
    }, grpcContext).toPromise()
    return result.data
  }

  @Query(() => [CollectionStoreDto])
  @Public()
  async collectionStores(
    @Context() context: GqlContext,
    @Args() args: CollectionStoreFilterArgs
  ): Promise<CollectionStoreDto[]> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collectionStores({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      // @ts-ignore
      paging: args?.paging,
      // @ts-ignore
      sorting: args?.sorting
    }, grpcContext).toPromise()

    return (result.collectionStores ?? [])
  }

  @Query(() => Int)
  @Public()
  async collectionStoresTotal(
    @Context() context: GqlContext,
    @Args() args: CollectionStoreFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc.collectionStoresTotal({
      filter: args?.filter ? JSON.stringify(args.filter) : null,
      paging: undefined,
      sorting: undefined
    }, grpcContext).toPromise()

    return (result.totalCount ?? 0)
  }

  @Public()
  @Mutation(() => CollectionStoreDto, { nullable: true })
  @UseInterceptors(HookInterceptor(HookTypes.BEFORE_CREATE_ONE, CollectionStoreInputType))
  async createCollectionStore(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateCollectionStoreInput
  ): Promise<CollectionStoreDto> {
    const grpcContext = setRpcContext(context)
    // @ts-ignore
    return await context.rpc.catalog.svc.createCollectionStore({ data: input?.collectionStore }, grpcContext).toPromise()

  }

  @Mutation(() => CollectionStoreDto, { nullable: true })
  @Public()
  async updateCollectionStore(
    @Context() context: GqlContext,
    @Args() { input }: UpdateCollectionStoreInput
  ): Promise<CollectionStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.updateCollectionStore(
      {
        // @ts-ignore
        id: input.id,
        // @ts-ignore
        data: input.update
      },
      grpcContext
    ).toPromise()
  }

  @Mutation(() => CollectionStoreDto, { nullable: true })
  @Public()
  async deleteCollectionStore(
    @Context() context: GqlContext,
    @Args() { input }: DeleteCollectionStoreInput
  ): Promise<CollectionStoreDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc.deleteCollectionStore(
      {
        // @ts-ignore
        id: input.id
      },
      grpcContext
    ).toPromise()
  }
}
