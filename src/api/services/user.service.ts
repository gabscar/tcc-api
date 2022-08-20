import { FormRegister } from '../interfaces';
import { User } from '../models';
import { loginRepository, userRepository } from '../repositories';
import * as bcrypt from 'bcrypt';
import { ILoginEntity } from 'api/entities/loginEntity';

export function findAll(): Promise<User[]> {
  return new Promise(async (resolve) => {
    const users: User[] = await userRepository.findAll();
    resolve(users);
  });
}

export function register(
  params: FormRegister
): Promise<ILoginEntity | boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const isEmailExist = await loginRepository.isEmailExist(params.email);
      if (isEmailExist && !isEmailExist.is_active) {
        const hashedPassword = await bcrypt.hashSync(params.password, 5);
        const updateUser = await userRepository.update({
          updateWhere: [{ column: 'id', value: isEmailExist.user_id }],
          newData: { is_active: true }
        });

        const updateLogin = await loginRepository.update({
          updateWhere: [{ column: 'email', value: isEmailExist.email }],
          newData: { is_active: true, password: hashedPassword }
        });
        if (!updateLogin || !updateUser) {
          reject(
            'Falha ao Reativar sua conta entre em contato com os administradores'
          );
          return;
        } else {
          resolve(true);
        }
      } else if (!isEmailExist) {
        const hashedPassword = await bcrypt.hashSync(params.password, 5);
        const registerUser = await userRepository.create({
          first_name: params.first_name,
          last_name: params.last_name
        });
        const registerlogin = await loginRepository.create({
          email: params.email,
          password: hashedPassword,
          user_id: registerUser?.getDataValue('id'),
          created_at: new Date(),
          created_by: 'system',
          id: undefined,
          is_active: true,
          is_verify: false,
          updated_at: new Date()
        });
        if (!registerlogin) {
          reject('Failed to register');
        }
        resolve(registerlogin);
      } else {
        reject('Email já está em uso');
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function remove(params: { id: string }): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const removed = await loginRepository.remove(params.id);
      resolve(removed);
    } catch (err) {
      reject(err);
    }
  });
}
