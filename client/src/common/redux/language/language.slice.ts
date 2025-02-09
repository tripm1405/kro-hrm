import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~common/redux/store';
import { ICategory } from '~app/manager/categories/category.type';

export interface ILanguageState {
  current?: string;
  items: ICategory[];
}

const initialState: ILanguageState = {
  items: [],
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<ILanguageState['current']>) => {
      state.current = action.payload;
    },
    setItems: (state, action: PayloadAction<ILanguageState['items']>) => {
      state.items = action.payload;
    }
  }
})

export const LanguageActions = languageSlice.actions

export const selectLanguage = (state: RootState) => state.language

const languageReducer = languageSlice.reducer;

export default languageReducer;