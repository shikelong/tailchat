import type { AppState } from 'tailchat-shared/redux/slices';
import { useSelector, useDispatch } from 'react-redux';

export function useAppSelector<T>(
  selector: (state: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  return useSelector<AppState, T>(selector, equalityFn);
}

export const useAppDispatch = useDispatch;
