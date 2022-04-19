import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AttributeFilterArgs,
  AttributeInputType,
  CreateAttributeInput,
  DeleteAttributeInput,
  UpdateAttributeInput
} from '@vg/api-gateway/modules/attribute/dto/attribute.args'
import { AttributeDto } from '@vg/api-gateway/modules/attribute/dto/attribute.dto'
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

@Resolver(() => AttributeDto)
@Resource('Attribute')
@UseInterceptors(AuthorizerInterceptor(AttributeDto))
export class AttributeResolver {
  @Query(() => AttributeDto, { nullable: true })
  @Public()
  async attribute(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<AttributeDto>
  ): Promise<AttributeDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .attribute(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [AttributeDto])
  @Public()
  async attributes(
    @Context() context: GqlContext,
    @Args() args: AttributeFilterArgs
  ): Promise<AttributeDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .attributes(
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

    return categories.attributes ?? []
  }

  @Query(() => Int)
  @Public()
  async attributesTotal(
    @Context() context: GqlContext,
    @Args() args: AttributeFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .attributesTotal(
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
  @Mutation(() => AttributeDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, AttributeInputType)
  )
  async createAttribute(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateAttributeInput
  ): Promise<AttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createAttribute({ data: input?.attribute }, grpcContext)
      .toPromise()
  }

  @Mutation(() => AttributeDto, { nullable: true })
  @Public()
  async updateAttribute(
    @Context() context: GqlContext,
    @Args() { input }: UpdateAttributeInput
  ): Promise<AttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateAttribute(
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

  @Mutation(() => AttributeDto, { nullable: true })
  @Public()
  async deleteAttribute(
    @Context() context: GqlContext,
    @Args() { input }: DeleteAttributeInput
  ): Promise<AttributeDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteAttribute(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
