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
import { ProductVariantAttributeDto } from '@vg/api-gateway/modules/productVariantAttribute/dto/productVariantAttribute.dto'

const dtoNames = getDTONames(ProductVariantAttributeDto, {
  dtoName: 'productVariantAttribute'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ProductVariantAttributeFilterArgs extends QueryArgsType(
  ProductVariantAttributeDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class ProductVariantAttributeInputType extends PartialType(
  ProductVariantAttributeDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ProductVariantAttributeInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ProductVariantAttributeInputType
) {}

@ArgsType()
export class CreateProductVariantAttributeInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateProductVariantAttributesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ProductVariantAttributeDto,
  ProductVariantAttributeInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ProductVariantAttributeDto,
  ProductVariantAttributeInputType
) {}

@ArgsType()
export class UpdateProductVariantAttributeInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateProductVariantAttributesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductVariantAttributeDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductVariantAttributeDto) {}

@ArgsType()
export class DeleteProductVariantAttributeInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteProductVariantAttributesInput extends MutationArgsType(
  DeleteManyInput
) {}
