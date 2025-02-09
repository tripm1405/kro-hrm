import { AxiosRequestConfig } from 'axios';
import { KWithRequired } from '~core/common/types/k-type';

export enum KApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type KApiMethodType = keyof typeof KApiMethod;

export interface IKApiRequest<TData = any, TParams = any>
  extends KWithRequired<
    Omit<AxiosRequestConfig<TData>, 'method' | 'params'>,
    'url'
  > {
  method?: KApiMethodType;
  params?: TParams;
}

export interface IKApiResponse<TData = any> {
  result?: TData;
  message?: string;
  success: boolean;
}
