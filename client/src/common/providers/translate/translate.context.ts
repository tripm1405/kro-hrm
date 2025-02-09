import { createContext, useContext } from 'react';

export interface ITranslateContextProps {
  translate: (code: string) => string;
}

export const TranslateContext = createContext<ITranslateContextProps>({
  translate: code => code,
});
export const useTranslateContext = () => useContext(TranslateContext);