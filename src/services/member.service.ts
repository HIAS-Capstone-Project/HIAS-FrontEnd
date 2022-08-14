import httpProvider from 'http/http-provider';
import { IMemberResponse } from 'models/member/types';
import { IMember, QueryParams } from 'pages/member/types';
import queryString from 'query-string';

export const getMembers = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IMemberResponse>(
    `member/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const addMember = async (param: IMember) => {
  const response = await httpProvider.post<IMember>('member/create', param);
  return response.data;
};

export const updateMember = async (param: IMember) => {
  const response = await httpProvider.put<IMember>('member/update', param);
  return response.data;
};

export const deleteMember = async (memberNo: number) => {
  const response = await httpProvider.delete<IMember>(
    `member/delete?memberNo=${memberNo}`,
  );
  return response.data;
};
