import httpProvider from 'http/http-provider';
import { IServiceProviderResponse } from 'models';
import { IServiceProvider, QueryParams } from 'pages/service-provider/types';
import queryString from 'query-string';

export const getServiceProviders = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    key,
    pageIndex: pagination?.current,
    pageSize: pagination?.pageSize,
  };
  const response = await httpProvider.get<IServiceProviderResponse>(
    `service-provider/list?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const saveServiceProvider = async (param: IServiceProvider) => {
  const response = await httpProvider.post<IServiceProviderResponse>(
    'service-provider/save',
    param,
  );
  return response.data;
};

export const deleteServiceProvider = async (serviceProviderNo: number) => {
  const response = await httpProvider.delete<IServiceProviderResponse>(
    `service-provider/delete?serviceProviderNo=${serviceProviderNo}`,
  );
  return response.data;
};
