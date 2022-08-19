import httpProvider from 'http/http-provider';
import { ILoginResponse } from 'models';
import { ILoginParams } from 'pages/login/types';

export const login = async (param: ILoginParams) => {
  const response = await httpProvider.post<ILoginResponse>('auth/login', param);
  return response.data;
};
