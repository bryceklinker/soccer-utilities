import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './root-state';

export const useRootDispatch = () => useDispatch();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
