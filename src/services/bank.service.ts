import httpProvider from 'http/http-provider';
import { IBank } from 'pages/member/types';

export const getAllBank = async () => {
  const response = await httpProvider.get<IBank[]>('bank/find-all');
  return response.data;
};
