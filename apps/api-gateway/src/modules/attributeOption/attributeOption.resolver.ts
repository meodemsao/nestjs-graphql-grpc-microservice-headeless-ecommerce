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
import { AttributeOptionDto } from '@vg/api-gateway/modules/attributeOption/dto/attributeOption.dto'
import {
  AttributeOptionFilterArgs,
  AttributeOptionInputType,
  CreateAttributeOptionInput,
  DeleteAttributeOptionInput,
  UpdateAttributeOptionInput
} from '@vg/api-gateway/modules/attributeOption/dto/attributeOption.args'

@Resolver(() => AttributeOptionDto)
@Resource('AttributeOption')
@UseInterceptors(AuthorizerInterceptor(AttributeOptionDto))
export class AttributeOptionResolver {
  @Query(() => AttributeOptionDto, { nullable: true })
  @Public()
  async attributeOption(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<AttributeOptionDto>
  ): Promise<AttributeOptionDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.catalog.svc
      .attributeOption(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [AttributeOptionDto])
  @Public()
  async attributeOptions(
    @Context() context: GqlContext,
    @Args() args: AttributeOptionFilterArgs
  ): Promise<AttributeOptionDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.catalog.svc
      .attributeOptions(
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

    return categories.attributeOptions ?? []
  }

  @Query(() => Int)
  @Public()
  async attributeOptionsTotal(
    @Context() context: GqlContext,
    @Args() args: AttributeOptionFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.catalog.svc
      .attributeOptionsTotal(
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
  @Mutation(() => AttributeOptionDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, AttributeOptionInputType)
  )
  async createAttributeOption(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateAttributeOptionInput
  ): Promise<AttributeOptionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      // @ts-ignore
      .createAttributeOption({ data: input?.attributeOption }, grpcContext)
      .toPromise()
  }

  @Mutation(() => AttributeOptionDto, { nullable: true })
  @Public()
  async updateAttributeOption(
    @Context() context: GqlContext,
    @Args() { input }: UpdateAttributeOptionInput
  ): Promise<AttributeOptionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .updateAttributeOption(
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

  @Mutation(() => AttributeOptionDto, { nullable: true })
  @Public()
  async deleteAttributeOption(
    @Context() context: GqlContext,
    @Args() { input }: DeleteAttributeOptionInput
  ): Promise<AttributeOptionDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.catalog.svc
      .deleteAttributeOption(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
