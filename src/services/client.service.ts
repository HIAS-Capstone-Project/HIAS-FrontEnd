import httpProvider from 'http/http-provider';
import { IClientResponse } from 'models/client/types';
import { IAddClientParams } from 'pages/client/types';

export const getAll = async () => {
  const response = await httpProvider.get<IClientResponse[]>('client/get-all');
  return response.data;
};

export const addClient = async (param: IAddClientParams) => {
  const response = await httpProvider.post<IClientResponse>(
    'client/create-client',
    param,
  );
  return response.data;
};

export const updateClient = async (param: IAddClientParams) => {
  const response = await httpProvider.post<IClientResponse>(
    'client/update-client',
    param,
  );
  return response.data;
};
