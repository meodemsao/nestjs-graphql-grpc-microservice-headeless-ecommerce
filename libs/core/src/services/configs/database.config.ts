import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { ConsulDatabaseConfig } from '@vg/common'
import { Boot, InjectBoot } from '@nestcloud/boot'

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(@InjectBoot() private readonly boot: Boot) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database = this.boot.get<ConsulDatabaseConfig>('database')
    console.log(database)
    return {
      type: 'mysql',
      host: database?.host,
      port: Number(database?.port),
      username: database?.user,
      password: database?.password,
      database: database?.database_name,
      entities: [process.cwd() + `/../libs/repository/src/entities/*.entity{.ts,.js}`],
      synchronize: true,
      migrationsRun: true,
      migrationsTableName: 'custom_migration_table',
      migrations: [__dirname + 'migration/*.js'],
      'cli': {
        'migrationsDir': 'migration'
      },
      autoLoadEntities: true,
      logging: ['error']
    }
  }
}
