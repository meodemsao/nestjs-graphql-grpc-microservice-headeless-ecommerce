import { Filter } from '@nestjs-query/core'
import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DiscountManufacturerFilterArgs,
  DiscountManufacturerInputType,
  CreateDiscountManufacturerInput,
  DeleteDiscountManufacturerInput,
  UpdateDiscountManufacturerInput
} from '@vg/api-gateway/modules/discountManufacturer/dto/discountManufacturer.args'
import { DiscountManufacturerDto } from '@vg/api-gateway/modules/discountManufacturer/dto/discountManufacturer.dto'
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

@Resolver(() => DiscountManufacturerDto)
@Resource('DiscountManufacturer')
@UseInterceptors(AuthorizerInterceptor(DiscountManufacturerDto))
export class DiscountManufacturerResolver {
  @Query(() => DiscountManufacturerDto, { nullable: true })
  @Public()
  async discountManufacturer(
    @Context() context: GqlContext,
    @Args() args: BaseUniqueFilterArgs,
    @AuthorizerFilter({
      operationGroup: OperationGroup.READ,
      many: false
    })
    authFilter: Filter<DiscountManufacturerDto>
  ): Promise<DiscountManufacturerDto> {
    const grpcContext = setRpcContext(context)
    const result = await context.rpc.discount.svc
      .discountManufacturer(
        {
          id: args.id
        },
        grpcContext
      )
      .toPromise()
    return result.data
  }

  @Query(() => [DiscountManufacturerDto])
  @Public()
  async discountManufacturers(
    @Context() context: GqlContext,
    @Args() args: DiscountManufacturerFilterArgs
  ): Promise<DiscountManufacturerDto[]> {
    const grpcContext = setRpcContext(context)

    const categories = await context.rpc.discount.svc
      .discountManufacturers(
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

    return categories.discountManufacturers ?? []
  }

  @Query(() => Int)
  @Public()
  async discountManufacturersTotal(
    @Context() context: GqlContext,
    @Args() args: DiscountManufacturerFilterArgs
  ): Promise<number> {
    const grpcContext = setRpcContext(context)

    const result = await context.rpc.discount.svc
      .discountManufacturersTotal(
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
  @Mutation(() => DiscountManufacturerDto, { nullable: true })
  @UseInterceptors(
    HookInterceptor(HookTypes.BEFORE_CREATE_ONE, DiscountManufacturerInputType)
  )
  async createDiscountManufacturer(
    @Context() context: GqlContext,
    @MutationHookArgs() { input }: CreateDiscountManufacturerInput
  ): Promise<DiscountManufacturerDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      // @ts-ignore
      .createDiscountManufacturer(
        // @ts-ignore
        { data: input?.discountManufacturer },
        grpcContext
      )
      .toPromise()
  }

  @Mutation(() => DiscountManufacturerDto, { nullable: true })
  @Public()
  async updateDiscountManufacturer(
    @Context() context: GqlContext,
    @Args() { input }: UpdateDiscountManufacturerInput
  ): Promise<DiscountManufacturerDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .updateDiscountManufacturer(
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

  @Mutation(() => DiscountManufacturerDto, { nullable: true })
  @Public()
  async deleteDiscountManufacturer(
    @Context() context: GqlContext,
    @Args() { input }: DeleteDiscountManufacturerInput
  ): Promise<DiscountManufacturerDto> {
    const grpcContext = setRpcContext(context)

    return await context.rpc.discount.svc
      .deleteDiscountManufacturer(
        {
          // @ts-ignore
          id: input.id
        },
        grpcContext
      )
      .toPromise()
  }
}
