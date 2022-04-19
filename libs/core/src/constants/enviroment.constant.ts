import * as dotenv from 'dotenv'

dotenv.config()

dotenv.config()

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development'
export const IS_PROD: boolean = NODE_ENV === 'production'
export const IS_DEV_MODE: boolean = NODE_ENV === 'development'
export const IS_TESTING: boolean = NODE_ENV === 'testing'
export const IS_TESTING_DB: string = process.env.TEST_DB
export const SCHEMA_APP_USER: string = process.env.SCHEMA_APP_USER
export const SCHEMA_APP_WORKER: string = process.env.SCHEMA_APP_WORKER
