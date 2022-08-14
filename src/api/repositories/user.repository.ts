import { User } from '../models';
import { RegisterUser } from '../interfaces';

export async function create(data: RegisterUser): Promise<User | void> {
  return new Promise(async (resolve, reject) => {
    const user = await User.create(data).catch((err) => {
      reject(err);
    });
    resolve(user);
  });
}

export async function findAll(): Promise<User[]> {
  return await User.findAll();
}

export async function findOne(email: string): Promise<User | null> {
  return new Promise(async (resolve) => {
    const login = await User.findOne({
      where: {
        email: email,
        is_active: true
      }
    });

    resolve(login);
  });
}
