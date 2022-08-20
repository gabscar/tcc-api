/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IRelation } from '../../interfaces/relation';
import { IUseCaseOptions } from '../../interfaces/useCaseOptions';
import { IWhere } from '../../helpers';
import { Op, FindOptions } from 'sequelize';

interface IInputFindByOptions<E>
  extends IWhere<keyof E, string | number | boolean>,
    IUseCaseOptions<keyof E> {}

interface IFindByOptionsWithNestedWheres<E> extends IUseCaseOptions<keyof E> {
  where: IWhere<keyof E, string | number | boolean>[];
}

interface IInputFindAllOptions<E>
  extends IUseCaseOptions<keyof E, string | number> {
  where?: IWhere<string, unknown>[];
}

export const includeNestedRelations = (
  relations?: IRelation<string, unknown>[]
): any =>
  relations &&
  relations.map((relation) => ({
    association: relation.tableName,
    include: relation.relations
      ? includeNestedRelations(relation.relations)
      : []
  }));

export const includeNestedRelationsWithWhere = (
  relations?: IRelation<string, unknown>[]
) =>
  relations &&
  relations.map((relation) => {
    const options: { [k: string]: unknown } = {
      association: relation.tableName
    };

    if (relation.where?.length) {
      options.where = relation.where.map(({ column, value }: any) => ({
        [column]: value
      }));
    }

    if (relation.relations) {
      options.include = includeNestedRelations(relation.relations);
    }

    return options;
  });

export const createFindByOptions = <E>(
  input: IInputFindByOptions<E>
): FindOptions => {
  const options: FindOptions = {
    where: { [input.column]: input.value },
    include: includeNestedRelations(input.relations)
  };

  return options;
};

export const createFindByOptionsWithNestedWheres = <E>(
  input: IFindByOptionsWithNestedWheres<E>
): FindOptions => {
  const options: FindOptions = {
    where: { [Op.or]: [...input.where.map((where) => unnestWheres(where))] },
    include: includeNestedRelations(input.relations)
  };

  return options;
};
interface whereInterface {
  [key: string]: unknown;
}

export const createFindAllOptions = <E>(
  input: IInputFindAllOptions<E>
): FindOptions => {
  const options = {
    limit: input.pagination ? input.pagination?.count : 10,
    offset: input.pagination
      ? Math.abs(input.pagination.count * input.pagination.page)
      : undefined,
    where: {} as whereInterface,
    order: [['updated_at', 'DESC']],
    include: includeNestedRelationsWithWhere(input?.relations)
  };

  input.where?.forEach(({ column, value }) => {
    options.where[column] = value;
  });

  if (!input.filters?.getDeactivated) {
    options.where['is_active'] = {
      [Op.is]: true
    };
  }

  input.filters?.contains?.forEach(({ column, value }) => {
    options.where[column as string] = {
      [Op.substring]: value
    };
  });

  return options as unknown as FindOptions;
};

export const unnestWheres = (
  where?: IWhere<string | number | symbol, unknown>
): any => {
  if (!where) {
    return {};
  }

  return {
    [where.column]: where.value,
    ...unnestWheres(where.where)
  };
};
