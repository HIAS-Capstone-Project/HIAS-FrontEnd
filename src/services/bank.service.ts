import httpProvider from 'http/http-provider';
import { IBank } from 'pages/member/types';

export const getBanks = async () => {
  const response = await httpProvider.get<IBank[]>('bank/find-all');
  return response.data;
};
