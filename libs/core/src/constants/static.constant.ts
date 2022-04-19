import * as dotenv from 'dotenv'

dotenv.config()

dotenv.config()

// static
export const StaticContant: string = process.env.STATIC || 'uploads'
export const STATIC_REPORT: string = process.env.STATIC_REPORT || 'reports'
export const STATIC_EXPORT: string = process.env.STATIC_EXPORT || 'export'
export const STATIC_LOGGER: string = process.env.STATIC_LOGGER || 'logs'
export const STATIC_EXPORT_FILE: string =
  process.env.STATIC_EXPORT_FILE || 'logs'
export const APPLY_IMAGE_HANDLE: boolean =
  process.env.APPLY_IMAGE_HANDLE === 'true'

export const ID_FIELD_LENGTH = 36