import { configureStore } from '@reduxjs/toolkit'
import languageReducer from '~common/redux/language/language.slice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type ICDispatch = typeof store.dispatch
export type ICStore = typeof store