import httpProvider from 'http/http-provider';
import { IPolicyResponse } from 'models';
import { IPolicy, QueryParams } from 'pages/policy/types';
import queryString from 'query-string';

export const getPolicies = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IPolicyResponse>(
    `policy/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const addPolicy = async (param: IPolicy) => {
  const response = await httpProvider.post<IPolicy>('policy/create', param);
  return response.data;
};

export const updatePolicy = async (param: IPolicy) => {
  const response = await httpProvider.put<IPolicy>('policy/update', param);
  return response.data;
};

export const deletePolicy = async (policyNo: number) => {
  const response = await httpProvider.delete<IPolicy>(
    `policy/delete?policyNo=${policyNo}`,
  );
  return response.data;
};
