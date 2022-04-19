import * as dotenv from 'dotenv'

dotenv.config()

dotenv.config()

export const DB_HOST:string = process.env.DB_HOST || "localhost"
export const DB_USERNAME:string = process.env.DB_USERNAME || "root"
export const DB_PASSWORD:string = process.env.DB_PASSWORD || "123456"
export const DB_DATABASE_NAME: string = process.env.DATABASE_NAME || "cqrs-ath"
export const DB_PORT:string = process.env.DB_PORT || '3306'