// src/entity/person.ts
import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Base } from './base';

@Table
export class Person extends Base {
  @Column
  name: string;

  @Column
  birthday: Date;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
