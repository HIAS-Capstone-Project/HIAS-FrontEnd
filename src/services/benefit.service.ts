import httpProvider from 'http/http-provider';
import { IBenefitResponse } from 'models/benefit/types';
import { IBenefit, QueryParams } from 'pages/benefit/types';
import queryString from 'query-string';

export const getAllBenefit = async () => {
  const response = await httpProvider.get<IBenefit[]>('benefit/find-all');
  return response.data;
};

export const getBenefits = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IBenefitResponse>(
    `benefit/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const addBenefit = async (param: IBenefit) => {
  const response = await httpProvider.post<IBenefit>('benefit/create', param);
  return response.data;
};

export const updateBenefit = async (param: IBenefit) => {
  const response = await httpProvider.put<IBenefit>('benefit/update', param);
  return response.data;
};

export const deleteBenefit = async (benefitNo: number) => {
  const response = await httpProvider.delete<IBenefit>(
    `benefit/delete/${benefitNo}`,
  );
  return response.data;
};
