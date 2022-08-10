import httpProvider from 'http/http-provider';
import { IClientResponse } from 'models/client/types';
import { IClient, QueryParams } from 'pages/client/types';
import queryString from 'query-string';

export const getAllClient = async () => {
  const response = await httpProvider.get<IClient[]>('client/get-all');
  return response.data;
};

export const getClients = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IClientResponse>(
    `client/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const addClient = async (param: IClient) => {
  const response = await httpProvider.post<IClient>('client/create', param);
  return response.data;
};

export const updateClient = async (param: IClient) => {
  const response = await httpProvider.put<IClient>('client/update', param);
  return response.data;
};

export const deleteClient = async (clientNo: number) => {
  const response = await httpProvider.delete<IClient>(
    `client/delete?clientNo=${clientNo}`,
  );
  return response.data;
};
