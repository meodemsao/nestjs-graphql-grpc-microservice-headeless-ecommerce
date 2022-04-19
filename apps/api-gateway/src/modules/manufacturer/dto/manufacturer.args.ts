import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ManufacturerDto } from '@vg/api-gateway/modules/manufacturer/dto/manufacturer.dto'

const dtoNames = getDTONames(ManufacturerDto, { dtoName: 'manufacturer' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ManufacturerFilterArgs extends QueryArgsType(ManufacturerDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ManufacturerInputType extends PartialType(ManufacturerDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ManufacturerInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ManufacturerInputType) {
}

@ArgsType()
export class CreateManufacturerInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateManufacturersInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ManufacturerDto, ManufacturerInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ManufacturerDto, ManufacturerInputType) {
}

@ArgsType()
export class UpdateManufacturerInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateManufacturersInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ManufacturerDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ManufacturerDto) {
}

@ArgsType()
export class DeleteManufacturerInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteManufacturersInput extends MutationArgsType(DeleteManyInput) {
}
