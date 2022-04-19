import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ManufacturerLocationDto } from '@vg/api-gateway/modules/manufacturerLocation/dto/manufacturerLocation.dto'

const dtoNames = getDTONames(ManufacturerLocationDto, { dtoName: 'manufacturerLocation' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ManufacturerLocationFilterArgs extends QueryArgsType(ManufacturerLocationDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ManufacturerLocationInputType extends PartialType(ManufacturerLocationDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ManufacturerLocationInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ManufacturerLocationInputType) {
}

@ArgsType()
export class CreateManufacturerLocationInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateManufacturerLocationsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ManufacturerLocationDto, ManufacturerLocationInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ManufacturerLocationDto, ManufacturerLocationInputType) {
}

@ArgsType()
export class UpdateManufacturerLocationInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateManufacturerLocationsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ManufacturerLocationDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ManufacturerLocationDto) {
}

@ArgsType()
export class DeleteManufacturerLocationInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteManufacturerLocationsInput extends MutationArgsType(DeleteManyInput) {
}
