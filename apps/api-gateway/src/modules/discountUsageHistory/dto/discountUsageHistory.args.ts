import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountUsageHistoryDto } from '@vg/api-gateway/modules/discountUsageHistory/dto/discountUsageHistory.dto'
import {
  CreateManyInputType,
  CreateOneInputType,
  DeleteManyInputType,
  DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType,
  UpdateManyInputType,
  UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'

const dtoNames = getDTONames(DiscountUsageHistoryDto, {
  dtoName: 'discountUsageHistory'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountUsageHistoryFilterArgs extends QueryArgsType(
  DiscountUsageHistoryDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class DiscountUsageHistoryInputType extends PartialType(
  DiscountUsageHistoryDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountUsageHistoryInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountUsageHistoryInputType
) {}

@ArgsType()
export class CreateDiscountUsageHistoryInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateDiscountUsageHistoriesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountUsageHistoryDto,
  DiscountUsageHistoryInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountUsageHistoryDto,
  DiscountUsageHistoryInputType
) {}

@ArgsType()
export class UpdateDiscountUsageHistoryInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateDiscountUsageHistoriesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountUsageHistoryDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountUsageHistoryDto) {}

@ArgsType()
export class DeleteDiscountUsageHistoryInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteDiscountUsageHistoriesInput extends MutationArgsType(
  DeleteManyInput
) {}
