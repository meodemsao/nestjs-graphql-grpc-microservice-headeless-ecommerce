import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
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
import { ProductVariantUsageHistoryDto } from '@vg/api-gateway/modules/productVariantUsageHistory/dto/productVariantUsageHistory.dto'

const dtoNames = getDTONames(ProductVariantUsageHistoryDto, {
  dtoName: 'productVariantUsageHistory'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ProductVariantUsageHistoryFilterArgs extends QueryArgsType(
  ProductVariantUsageHistoryDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class ProductVariantUsageHistoryInputType extends PartialType(
  ProductVariantUsageHistoryDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ProductVariantUsageHistoryInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ProductVariantUsageHistoryInputType
) {}

@ArgsType()
export class CreateProductVariantUsageHistoryInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateProductVariantUsageHistoriesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ProductVariantUsageHistoryDto,
  ProductVariantUsageHistoryInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ProductVariantUsageHistoryDto,
  ProductVariantUsageHistoryInputType
) {}

@ArgsType()
export class UpdateProductVariantUsageHistoryInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateProductVariantUsageHistoriesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(
  ProductVariantUsageHistoryDto
) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(
  ProductVariantUsageHistoryDto
) {}

@ArgsType()
export class DeleteProductVariantUsageHistoryInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteProductVariantUsageHistoriesInput extends MutationArgsType(
  DeleteManyInput
) {}
