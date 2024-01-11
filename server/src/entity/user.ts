import { Table, Column } from 'sequelize-typescript';
import { Base } from './base';

@Table
export class User extends Base {
  @Column
  username: string;

  @Column
  password: string;
}
