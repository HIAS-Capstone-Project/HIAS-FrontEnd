import httpProvider from 'http/http-provider';
import { ILoginParams } from './../pages/login/types';

export const login = async (param: ILoginParams) => {
  const response = await httpProvider.post<any>('auth/login', param);
  return response;
};
