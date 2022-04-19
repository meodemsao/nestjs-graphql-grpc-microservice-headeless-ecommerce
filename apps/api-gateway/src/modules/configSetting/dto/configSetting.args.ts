import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ConfigSettingDto } from '@vg/api-gateway/modules/configSetting/dto/configSetting.dto'

const dtoNames = getDTONames(ConfigSettingDto, { dtoName: 'configSetting' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ConfigSettingFilterArgs extends QueryArgsType(ConfigSettingDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ConfigSettingInputType extends PartialType(ConfigSettingDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ConfigSettingInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ConfigSettingInputType) {
}

@ArgsType()
export class CreateConfigSettingInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateConfigSettingsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ConfigSettingDto, ConfigSettingInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ConfigSettingDto, ConfigSettingInputType) {
}

@ArgsType()
export class UpdateConfigSettingInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateConfigSettingsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ConfigSettingDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ConfigSettingDto) {
}

@ArgsType()
export class DeleteConfigSettingInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteConfigSettingsInput extends MutationArgsType(DeleteManyInput) {
}
