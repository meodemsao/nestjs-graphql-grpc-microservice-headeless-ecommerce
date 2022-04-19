import { Id } from '@vg/proto-schema'

export class DeleteManufacturerLocationCommand {
  constructor(public readonly data: Id) {
  }
}