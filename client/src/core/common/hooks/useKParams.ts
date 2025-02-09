import { useParams } from 'react-router-dom';

export default function useKParams<TData extends Record<string, string>>(init: TData): TData {
  const urlParams = useParams<TData>();

  return {
    ...init,
    ...urlParams,
  }
}