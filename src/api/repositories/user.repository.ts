import { User } from '../models';
import { IUpdateUser, RegisterUser } from '../interfaces/User/userInterface';
import { Transaction } from 'sequelize';
import { Op } from 'sequelize';
import { unnestWheres } from './utillity/repositoryUtils';

export async function create(data: RegisterUser): Promise<User | void> {
  const user = await User.create({
    ...data,
    updated_at: new Date(),
    created_at: new Date()
  });

  return user;
}

export async function update(
  input: IUpdateUser,
  transaction?: Transaction
): Promise<User | void> {
  const userResult = await User.update(input.newData, {
    where: {
      [Op.and]: [...input.updateWhere.map((where) => unnestWheres(where))]
    },
    transaction
  });
  if (userResult && userResult[0] === 0) {
    return void 0;
  }
  return input.newData as User;
}

export async function findAll(): Promise<User[]> {
  return await User.findAll();
}

export async function findOne(email: string): Promise<User | null> {
  const login = await User.findOne({
    where: {
      email: email,
      is_active: true
    }
  });

  return login;
}
