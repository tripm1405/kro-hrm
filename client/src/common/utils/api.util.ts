import axios from 'axios';
import qs from 'qs';
import {
  IKApiResponse,
  IKApiRequest,
  KApiMethod,
} from '~core/common/types/api/api.type';
import {
  IKByOffsetApiRequestParams,
  IKGetByOffsetApiRequest,
  IKGetByOffsetApiResponse,
} from '~core/by-offset/k-by-offset.api.type';

export const API_DOMAIN = '/api';

export default class ApiUtil {
  static instance = axios.create({
    // KDo: env baseURL for Local and Deploy
    baseURL: 'https://localhost:5500',
    paramsSerializer: (params) => {
      return qs.stringify(params, {
        encode: false,
        allowDots: true,
      });
    },
  });

  static request<TResult>({ url, data, method, ...config }: IKApiRequest) {
    switch (method) {
      default:
      case KApiMethod.GET: {
        return this.instance
          .get<IKApiResponse<TResult>>(url, config)
          .then((res) => res.data);
      }
      case KApiMethod.POST: {
        return this.instance
          .post<IKApiResponse<TResult>>(url, data, config)
          .then((res) => res.data);
      }
      case KApiMethod.PUT: {
        return this.instance
          .put<IKApiResponse<TResult>>(url, data, config)
          .then((res) => res.data);
      }
      case KApiMethod.PATCH: {
        return this.instance
          .patch<IKApiResponse<TResult>>(url, data, config)
          .then((res) => res.data);
      }
      case KApiMethod.DELETE: {
        return this.instance
          .delete<IKApiResponse<TResult>>(url, config)
          .then((res) => res.data);
      }
    }
  }

  static getByOffset<
    TData = any,
    TParams extends IKByOffsetApiRequestParams = IKByOffsetApiRequestParams,
  >({ url, ...config }: IKGetByOffsetApiRequest<TData, TParams>) {
    return this.instance
      .get<IKGetByOffsetApiResponse<TData>>(url, config)
      .then((res) => res.data);
  }
}
