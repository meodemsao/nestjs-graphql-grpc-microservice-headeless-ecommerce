import { IQuery } from '@nestjs/cqrs'

export class GetConfigSettingQuery implements IQuery {
  constructor(public readonly id: string) {}
}
