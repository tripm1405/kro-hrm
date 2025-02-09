import { IKQueryProps, useKQuery } from '~core/common/hooks/useKQuery';
import { IKGetByOffsetApiData } from '~core/by-offset/k-by-offset.api.type';

export interface IKByOffsetQueryProps<TData> extends IKQueryProps<IKGetByOffsetApiData<TData>> {}

export default function useKByOffsetQuery<TData>(props: IKByOffsetQueryProps<TData>) {
  return useKQuery<IKGetByOffsetApiData<TData>>(props);
}