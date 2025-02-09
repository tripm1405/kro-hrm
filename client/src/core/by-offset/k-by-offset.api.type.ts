import { IKApiRequest, IKApiResponse } from '~core/common/types/api/api.type';

export interface IKGetByOffsetApiData<TItem> {
  items: TItem[];
  page: number;
  size: number;
  total: number;
}

export interface IKByOffsetApiRequestParams {
  page?: number;
  size?: number;
  sort?: IKByOffsetApiRequestOrderByParams[];
  listFilter?: IKByOffsetApiRequestFilterParams[];
}

export interface IKByOffsetApiRequestOrderByParams {
  property: string;
  type: IKByOffsetApiRequestOrderByParamsType;
}

export enum IKByOffsetApiRequestOrderByParamsType {
  'Ascending' = 0,
  'Descending' = 1,
}

export interface IKByOffsetApiRequestFilterParams {
  property: string;
  type: IKByOffsetApiRequestFilterParamsType;
  data: Record<string, any>;
}

export enum IKByOffsetApiRequestFilterParamsType {
  'In_Str_AllWithOrder' = 0,
  'Out_Str_Any' = 1,
}

export interface IKGetByOffsetApiResponse<TItem>
  extends IKApiResponse<IKGetByOffsetApiData<TItem>> {}

export interface IKGetByOffsetApiRequest<
  TData = any,
  TParams extends IKByOffsetApiRequestParams = IKByOffsetApiRequestParams,
> extends Omit<
    IKApiRequest<TData, TParams>,
    'method' | 'data'
  > {}
