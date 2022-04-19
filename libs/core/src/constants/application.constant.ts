import * as dotenv from 'dotenv'

dotenv.config()

dotenv.config()

// application
export const DOMAIN: string = process.env.DOMAIN || 'localhost'
export const PORT: number = +process.env.PORT || 4000
export const END_POINT: string = process.env.END_POINT || '/'
export const END_POINT_SWAGGER: string =
  process.env.END_POINT_SWAGGER || '/swagger'
export const FRONTEND_URL: string =
  process.env.FRONTEND_URL || 'http://localhost:3000'
export const BACKEND_URL: string =
  process.env.FRONTEND_URL || 'http://localhost:4000'
export const UPLOAD_ENDPOINT: string =
  process.env.UPLOAD_ENDPOINT || 'http://localhost:4000'

// graphql
export const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3
export const IS_PLAYGROUND: boolean = process.env.IS_PLAYGROUND === 'true'


// config
export const PAGE_INDEX = 0

export const PAGE_SIZE = 20

