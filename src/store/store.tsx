import React, { createContext, useContext, useReducer } from 'react';
import { applyMiddleware } from './middleware';
import reducer, { IObject } from './reducer';

const Context = createContext([] as any[]);

const combindedReducers = (state: IObject = {}, action: IObject = {}) => {
  const keys = Object.keys(reducer);
  return Object.assign(
    {},
    ...keys.map((key: string) => ({
      [key]: reducer[key](state[key], action),
    })),
  );
};

const ContextProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(
    combindedReducers,
    combindedReducers({}),
  );
  const getState = () => state;
  return (
    <Context.Provider value={[state, applyMiddleware(dispatch, getState)]}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useStore = (slice: string) => {
  const [state, dispatch] = useContext(Context);
  if (slice) {
    return [state[slice], dispatch];
  }
  return [state, dispatch];
};

export type DispatchType<IPayload = any> = React.Dispatch<{
  type: string;
  payload: IPayload;
}>;
