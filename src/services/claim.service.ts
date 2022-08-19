import httpProvider from 'http/http-provider';
import { IClaimResponse } from 'models/claim/types';
import { IClaim, QueryParams } from 'pages/claim/types';
import queryString from 'query-string';

export const getClaims = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IClaimResponse>(
    `claim/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const submitClaimByMember = async (param: FormData) => {
  const response = await httpProvider.post<any>('claim/submit', param);
  return response.data;
};

export const getDetailClaim = async (param: number) => {
  const response = await httpProvider.get<IClaim>(`claim/view-detail/${param}`);
  return response.data;
};
