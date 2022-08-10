import httpProvider from 'http/http-provider';
import { IBenefitItemResponse } from 'models/benefit-item/types';
import { IBenefitItem, QueryParams } from 'pages/benefit-item/types';
import queryString from 'query-string';

export const getBenefitItems = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IBenefitItemResponse>(
    `benefit-item/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const addBenefitItem = async (param: IBenefitItem) => {
  const response = await httpProvider.post<IBenefitItem>(
    'benefit-item/create',
    param,
  );
  return response.data;
};

export const updateBenefitItem = async (param: IBenefitItem) => {
  const response = await httpProvider.put<IBenefitItem>(
    'benefit-item/update',
    param,
  );
  return response.data;
};

export const deleteBenefitItem = async (benefitItemNo: number) => {
  const response = await httpProvider.delete<IBenefitItem>(
    `benefit-item/delete/${benefitItemNo}`,
  );
  return response.data;
};
