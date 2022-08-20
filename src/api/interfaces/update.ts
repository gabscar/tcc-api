import { IWhere } from 'api/helpers';

export interface IUpdate<K, V, E> {
  updateWhere: IWhere<keyof K, V>[];
  newData: Partial<E>;
}
