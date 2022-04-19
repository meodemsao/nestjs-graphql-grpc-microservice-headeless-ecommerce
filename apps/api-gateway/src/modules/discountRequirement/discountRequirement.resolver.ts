import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountRequirementFilterArgs,
  DiscountRequirementInputType,
  CreateDiscountRequirementInput,
  DeleteDiscountRequirementInput,
  UpdateDiscountRequirementInput
} from '@vg/api-gateway/modules/discountRequirement/dto/discountRequirement.args'
import { DiscountRequirementDto } from '@vg/api-gateway/modules/discountRequirement/dto/discountRequirement.dto'
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

@Resolver(() => DiscountRequirementDto)
@Resource('DiscountRequirement')
@UseInterceptors(AuthorizerInterceptor(DiscountRequirementDto))
export class DiscountRequirementResolver {
  @Query(() => DiscountRequirementDto, { nullable: true })
  @Public()
  async discountRequirement(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<DiscountRequirementDto>
  ): Promise<DiscountRequirementDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discountRequirement(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountRequirementDto])
  @Public()
  async discountRequirements(
    @Context() context: GqlContext,
    @Args() args: DiscountRequirementFilterArgs
  ): Promise<DiscountRequirementDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discountRequirements(
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

    return categories.discountRequirements ?? []
  }

  @Query(() => Int)
  @Public()
  async discountRequirementsTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountRequirementFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountRequirementsTotal(
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
  @Mutation(() => DiscountRequirementDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountRequirementInputType)
  )
  async createDiscountRequirement(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountRequirementInput
  ): Promise<DiscountRequirementDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscountRequirement(
        // @ts-ignore
        { data: input?.discountRequirement },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => DiscountRequirementDto, { nullable: true })
  @Public()
  async updateDiscountRequirement(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountRequirementInput
  ): Promise<DiscountRequirementDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscountRequirement(
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

  @Mutation(() => DiscountRequirementDto, { nullable: true })
  @Public()
  async deleteDiscountRequirement(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountRequirementInput
  ): Promise<DiscountRequirementDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscountRequirement(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
