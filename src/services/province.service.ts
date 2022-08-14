import httpProvider from 'http/http-provider';
import { IProvince } from 'pages/member/types';

export const getAllProvince = async () => {
  const response = await httpProvider.get<IProvince[]>('province/find-all');
  return response.data;
};
