import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { ImportPriceHistoryDto } from '@vg/api-gateway/modules/importPriceHistory/dto/importPriceHistory.dto'
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

const dtoNames = getDTONames(ImportPriceHistoryDto, {
  dtoName: 'importPriceHistory'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ImportPriceHistoryFilterArgs extends QueryArgsType(
  ImportPriceHistoryDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class ImportPriceHistoryInputType extends PartialType(
  ImportPriceHistoryDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ImportPriceHistoryInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ImportPriceHistoryInputType
) {}

@ArgsType()
export class CreateImportPriceHistoryInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateImportPriceHistoriesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ImportPriceHistoryDto,
  ImportPriceHistoryInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ImportPriceHistoryDto,
  ImportPriceHistoryInputType
) {}

@ArgsType()
export class UpdateImportPriceHistoryInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateImportPriceHistoriesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ImportPriceHistoryDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ImportPriceHistoryDto) {}

@ArgsType()
export class DeleteImportPriceHistoryInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteImportPriceHistoriesInput extends MutationArgsType(
  DeleteManyInput
) {}
