import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ImportPriceHistoryFilterArgs,
  ImportPriceHistoryInputType,
  CreateImportPriceHistoryInput,
  DeleteImportPriceHistoryInput,
  UpdateImportPriceHistoryInput
} from '@vg/api-gateway/modules/importPriceHistory/dto/importPriceHistory.args'
import { ImportPriceHistoryDto } from '@vg/api-gateway/modules/importPriceHistory/dto/importPriceHistory.dto'
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

@Resolver(() => ImportPriceHistoryDto)
@Resource('ImportPriceHistory')
@UseInterceptors(AuthorizerInterceptor(ImportPriceHistoryDto))
export class ImportPriceHistoryResolver {
  @Query(() => ImportPriceHistoryDto, { nullable: true })
  @Public()
  async importPriceHistory(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<ImportPriceHistoryDto>
  ): Promise<ImportPriceHistoryDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .importPriceHistory(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [ImportPriceHistoryDto])
  @Public()
  async importPriceHistories(
    @Context() context: GqlContext,
    @Args() args: ImportPriceHistoryFilterArgs
  ): Promise<ImportPriceHistoryDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .importPriceHistories(
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

    return categories.importPriceHistories ?? []
  }

  @Query(() => Int)
  @Public()
  async importPriceHistoriesTotal(
    @Context() context: GqlContext,
    @Args() args: ImportPriceHistoryFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .importPriceHistoriesTotal(
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
  @Mutation(() => ImportPriceHistoryDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, ImportPriceHistoryInputType)
  )
  async createImportPriceHistory(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateImportPriceHistoryInput
  ): Promise<ImportPriceHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createImportPriceHistory(
        // @ts-ignore
        { data: input?.importPriceHistory },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => ImportPriceHistoryDto, { nullable: true })
  @Public()
  async updateImportPriceHistory(
    @Context() context: GqlContext,
    @Args() { input }: UpdateImportPriceHistoryInput
  ): Promise<ImportPriceHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateImportPriceHistory(
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

  @Mutation(() => ImportPriceHistoryDto, { nullable: true })
  @Public()
  async deleteImportPriceHistory(
    @Context() context: GqlContext,
    @Args() { input }: DeleteImportPriceHistoryInput
  ): Promise<ImportPriceHistoryDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteImportPriceHistory(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
