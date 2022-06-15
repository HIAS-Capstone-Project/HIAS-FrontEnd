import { isFunction } from 'lodash';

export const applyMiddleware =
  (dispatch: any, getState: any) => (action: any) => {
    dispatch(isFunction(action) ? action(dispatch, getState) : action);
  };
export default applyMiddleware;
