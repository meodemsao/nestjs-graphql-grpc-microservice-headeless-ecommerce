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
import { ProductVariantDto } from '@vg/api-gateway/modules/productVariant/dto/productVariant.dto'

const dtoNames = getDTONames(ProductVariantDto, { dtoName: 'productVariant' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ProductVariantFilterArgs extends QueryArgsType(ProductVariantDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class ProductVariantInputType extends PartialType(
  ProductVariantDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ProductVariantInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ProductVariantInputType
) {}

@ArgsType()
export class CreateProductVariantInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateProductVariantsInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ProductVariantDto,
  ProductVariantInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ProductVariantDto,
  ProductVariantInputType
) {}

@ArgsType()
export class UpdateProductVariantInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateProductVariantsInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductVariantDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductVariantDto) {}

@ArgsType()
export class DeleteProductVariantInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteProductVariantsInput extends MutationArgsType(
  DeleteManyInput
) {}
