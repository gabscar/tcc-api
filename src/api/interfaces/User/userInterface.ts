import { IUserEntity } from '@api/entities/userEntity';
import { IUpdate } from '../update';

export interface RegisterUser {
  first_name: string;
  last_name: string;
}
export type UserEntityKeys = Pick<IUserEntity, 'id'>;
export type IUpdateUser = IUpdate<
  UserEntityKeys,
  string | number | boolean,
  IUserEntity
>;
