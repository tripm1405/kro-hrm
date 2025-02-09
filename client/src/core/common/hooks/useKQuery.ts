import {useQuery} from "@tanstack/react-query";
import {UseQueryOptions} from "@tanstack/react-query/src/types";
import { IKApiResponse } from '~core/common/types/api/api.type';

export interface IKQueryProps<TData> extends UseQueryOptions<IKApiResponse<TData>> {}

export function useKQuery<
  TQueryFnData = unknown,
>(props: IKQueryProps<TQueryFnData>) {
  return useQuery<IKApiResponse<TQueryFnData>>({
    refetchOnWindowFocus: false,
    retry: 0,
    ...props,
  });
}