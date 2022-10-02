import { Login } from '../models';
import { ILoginEntity } from 'api/entities/loginEntity';
import { Op, Transaction } from 'sequelize';
import { unnestWheres } from './utillity/repositoryUtils';
import { IUpdateLogin } from '../interfaces/Login/loginInterfaces';

export async function isEmailExist(
  email: string
): Promise<ILoginEntity | void> {
  const login = await Login.findOne({
    where: {
      email: email
    }
  });

  if (!login) {
    return void 0;
  } else {
    return login.get({ plain: true });
  }
}

export async function update(
  input: IUpdateLogin,
  transaction?: Transaction
): Promise<ILoginEntity | void> {
  const userResult = await Login.update(input.newData, {
    where: {
      [Op.and]: [...input.updateWhere.map((where) => unnestWheres(where))]
    },
    transaction
  });
  if (userResult && userResult[0] === 0) {
    return void 0;
  }
  return input.newData as ILoginEntity;
}

export async function create(
  data: ILoginEntity
): Promise<ILoginEntity | boolean> {
  return new Promise(async (resolve, reject) => {
    const login = await Login.create(data).catch((err) => {
      reject(err);
    });
    if (!login) {
      resolve(false);
    } else {
      resolve(login as unknown as ILoginEntity);
    }
  });
}

export async function findOne(email: string): Promise<ILoginEntity | null> {
  const login = await Login.findOne({
    where: {
      email: email,
      is_active: true
    }
  });

  if (!login) return null;
  return login.get({ plain: true });
}

export async function getMeta(email: string): Promise<ILoginEntity | null> {
  const login = await Login.findOne({
    attributes: ['id', 'email', 'user_id', 'is_verify'],
    where: {
      email: email,
      is_active: true
    }
  });

  if (!login) return null;
  return login.get({ plain: true });
}

export async function remove(id: string): Promise<boolean> {
  const [result, _] = await Login.update(
    {
      is_active: false
    },
    {
      where: {
        id: id
      }
    }
  );
  if (!result) {
    return false;
  }
  return true;
}
