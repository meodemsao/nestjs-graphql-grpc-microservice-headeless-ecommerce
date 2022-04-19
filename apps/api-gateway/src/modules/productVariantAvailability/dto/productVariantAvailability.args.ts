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
import { ProductVariantAvailabilityDto } from '@vg/api-gateway/modules/productVariantAvailability/dto/productVariantAvailability.dto'

const dtoNames = getDTONames(ProductVariantAvailabilityDto, {
  dtoName: 'productVariantAvailability'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ProductVariantAvailabilityFilterArgs extends QueryArgsType(
  ProductVariantAvailabilityDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class ProductVariantAvailabilityInputType extends PartialType(
  ProductVariantAvailabilityDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ProductVariantAvailabilityInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ProductVariantAvailabilityInputType
) {}

@ArgsType()
export class CreateProductVariantAvailabilityInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateProductVariantAvailabilitiesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ProductVariantAvailabilityDto,
  ProductVariantAvailabilityInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ProductVariantAvailabilityDto,
  ProductVariantAvailabilityInputType
) {}

@ArgsType()
export class UpdateProductVariantAvailabilityInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateProductVariantAvailabilitiesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(
  ProductVariantAvailabilityDto
) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(
  ProductVariantAvailabilityDto
) {}

@ArgsType()
export class DeleteProductVariantAvailabilityInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteProductVariantAvailabilitiesInput extends MutationArgsType(
  DeleteManyInput
) {}
