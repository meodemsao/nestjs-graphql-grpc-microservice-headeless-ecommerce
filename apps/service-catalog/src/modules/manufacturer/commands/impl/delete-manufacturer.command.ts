import { Id } from '@vg/proto-schema'

export class DeleteManufacturerCommand {
  constructor(public readonly data: Id) {
  }
}