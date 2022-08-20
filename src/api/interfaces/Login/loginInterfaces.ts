import { IUpdate } from '../update';
import { ILoginEntity } from '../../entities/loginEntity';

export interface FormLogin {
  email: string;
  password: string;
}

export interface RegisterLogin extends FormLogin {
  user_id: string;
}
export type LoginEntityKeys = Pick<ILoginEntity, 'id' | 'email' | 'user_id'>;
export type IUpdateLogin = IUpdate<
  LoginEntityKeys,
  string | number | boolean,
  ILoginEntity
>;
