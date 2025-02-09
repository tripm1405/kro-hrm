import { useDispatch, useSelector } from 'react-redux'
import type { ICDispatch, RootState } from './store'

export const useCDispatch = useDispatch.withTypes<ICDispatch>()
export const useCSelector = useSelector.withTypes<RootState>()