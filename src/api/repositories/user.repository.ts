import { User } from '../models';
import { IUpdateUser, RegisterUser } from '../interfaces/User/userInterface';
import { Transaction } from 'sequelize';
import { Op } from 'sequelize';
import { unnestWheres } from './utillity/repositoryUtils';
export async function create(data: RegisterUser): Promise<User | void> {
  return new Promise(async (resolve, reject) => {
    const user = await User.create(data).catch((err) => {
      reject(err);
    });
    resolve(user);
  });
}

export async function update(
  input: IUpdateUser,
  transaction?: Transaction
): Promise<User> {
  return new Promise(async (resolve, reject) => {
    const userResult = await User.update(input.newData, {
      where: {
        [Op.and]: [...input.updateWhere.map((where) => unnestWheres(where))]
      },
      transaction
    }).catch((err) => {
      reject(err);
    });
    if (userResult && userResult[0] === 0) {
      reject('Erro ao atualizar usuário');
    }
    resolve(input.newData as User);
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
