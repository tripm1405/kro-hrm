import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

interface IReturn<TData extends Record<any, any>> {
  searchParams: TData;
  setSearchParams: SetURLSearchParams;
}

export default function useKSearchParams<TData extends Record<any, any>>(
  init?: TData
): IReturn<TData> {
  const [searchParams, setSearchParams] = useSearchParams(
    init && Object.entries(init)
  );

  return {
    searchParams: Object.fromEntries(searchParams.entries()) as TData,
    setSearchParams: setSearchParams,
  };
}
