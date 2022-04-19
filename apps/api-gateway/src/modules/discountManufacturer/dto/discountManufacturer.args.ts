import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountManufacturerDto } from '@vg/api-gateway/modules/discountManufacturer/dto/discountManufacturer.dto'
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

const dtoNames = getDTONames(DiscountManufacturerDto, {
  dtoName: 'discountManufacturer'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountManufacturerFilterArgs extends QueryArgsType(
  DiscountManufacturerDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class DiscountManufacturerInputType extends PartialType(
  DiscountManufacturerDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountManufacturerInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountManufacturerInputType
) {}

@ArgsType()
export class CreateDiscountManufacturerInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateDiscountManufacturersInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountManufacturerDto,
  DiscountManufacturerInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountManufacturerDto,
  DiscountManufacturerInputType
) {}

@ArgsType()
export class UpdateDiscountManufacturerInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateDiscountManufacturersInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountManufacturerDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountManufacturerDto) {}

@ArgsType()
export class DeleteDiscountManufacturerInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteDiscountManufacturersInput extends MutationArgsType(
  DeleteManyInput
) {}
