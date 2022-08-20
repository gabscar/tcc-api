import { IRelation } from './relation';

export interface IPagination {
  count: number;
  page: number;
}

export interface IContainsOptions<C, V> {
  column: C;
  value: V;
}

export interface IFilter<C = unknown, V = string> {
  contains?: IContainsOptions<C, V>[];
  getDeactivated?: boolean;
  getSoftDeleteds?: boolean;
}

export interface IUseCaseOptions<FC = unknown, FV = string> {
  transaction?: unknown;
  pagination?: IPagination | null;
  filters?: IFilter<FC, FV>;
  relations?: IRelation<string, unknown>[];
}

export interface IPaginatedResponse<T = unknown> {
  count: number;
  page: number;
  perPage: number;
  items: T[];
}
