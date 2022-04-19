import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert, VersionColumn
} from 'typeorm'

import { initNewDate } from '@vg/common'
import { AggregateRoot } from '@nestjs/cqrs'
import { BaseDto } from '@vg/repository/dtos'

@ObjectType()
export class BaseEntity<T extends BaseDto = BaseDto> extends AggregateRoot {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt?: Date

  @DeleteDateColumn({ name: 'deletedAt', nullable: true, type: 'timestamp' })
  deletedAt?: Date

  @Field(() => ID, { nullable: true })
  createdBy?: string

  @Field(() => ID, { nullable: true })
  updatedBy?: string

  @Field(() => ID, { nullable: true })
  deletedBy?: string

  @VersionColumn({ name: 'version' })
  version: number

  @BeforeInsert()
  async setCreatedAt(): Promise<void> {
    this.createdAt = initNewDate()
  }
}
