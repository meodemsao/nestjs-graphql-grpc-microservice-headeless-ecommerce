import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { LocationDto } from '@vg/api-gateway/modules/location/dto/location.dto'
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

const dtoNames = getDTONames(LocationDto, { dtoName: 'location' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class LocationFilterArgs extends QueryArgsType(LocationDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class LocationInputType extends PartialType(LocationDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  LocationInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  LocationInputType
) {}

@ArgsType()
export class CreateLocationInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateLocationsInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  LocationDto,
  LocationInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  LocationDto,
  LocationInputType
) {}

@ArgsType()
export class UpdateLocationInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateLocationsInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(LocationDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(LocationDto) {}

@ArgsType()
export class DeleteLocationInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteLocationsInput extends MutationArgsType(DeleteManyInput) {}
