import { loginRepository } from '../repositories';
import { Token } from '../interfaces';
import { signToken } from '../helpers/token';
import * as bcrypt from 'bcrypt';
import { FormLogin } from 'api/interfaces/Login/loginInterfaces';
import { ILoginEntity } from 'api/entities/loginEntity';

export function getMeta(params: {
  userdata: string;
}): Promise<ILoginEntity | null> {
  return new Promise(async (resolve) => {
    const login: ILoginEntity | null = await loginRepository.getMeta(
      params.userdata
    );
    resolve(login);
  });
}

export function login(params: FormLogin): Promise<Token> {
  return new Promise(async (resolve, reject) => {
    try {
      const login: ILoginEntity | null = await loginRepository.findOne(
        params.email
      );
      if (!login) {
        reject('Email is not exists');
        return;
      }
      const isValid = await bcrypt.compareSync(params.password, login.password);

      if (!isValid) {
        reject('Invalid password');
        return;
      }
      const expires = '1d';
      const token = await signToken(params.email, expires);
      if (!token) {
        reject('Invalid token');
        return;
      }
      resolve({
        token: `Bearer ${token}`,
        expires: expires
      });
    } catch (err) {
      reject(err);
    }
  });
}
