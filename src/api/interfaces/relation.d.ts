import { IWhere } from '@api/helpers';

export interface IRelation<
  TN = string,
  CTC = string,
  FJC = string,
  WC = string,
  WV = unknown
> {
  tableName: TN;
  currentTableColumn: CTC;
  foreignJoinColumn: FJC;
  relations?: IRelation[];
  where?: IWhere<WC, WV>[];
}
