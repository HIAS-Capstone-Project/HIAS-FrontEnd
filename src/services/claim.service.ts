import httpProvider from 'http/http-provider';
import { IClaimResponse } from 'models/claim/types';
import {
  IClaim,
  IClaimPaymentRequestDTO,
  IClaimUpdateRequestDTO,
  QueryParams,
} from 'pages/claim/types';
import queryString from 'query-string';
import { IClaimRejectRequestDTO } from './../pages/claim/types';

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

export const saveDraftClaimByMember = async (param: FormData) => {
  const response = await httpProvider.post<any>('claim/save-draft', param);
  return response.data;
};

export const getDetailClaim = async (param: number) => {
  const response = await httpProvider.get<IClaim>(`claim/view-detail/${param}`);
  return response.data;
};

export const startProgressVerify = async (param: number) => {
  const response = await httpProvider.post<any>(
    `claim/start-progress/${param}`,
    {},
  );
  return response.data;
};

export const businessVerified = async (param: number) => {
  const response = await httpProvider.post<any>(
    `claim/business-verified/${param}`,
    {},
  );
  return response.data;
};

export const cancelClaim = async (param: number) => {
  const response = await httpProvider.post<any>(
    `claim/cancel-claim/${param}`,
    {},
  );
  return response.data;
};

export const medicalVerified = async (param: number) => {
  const response = await httpProvider.post<any>(
    `claim/medical-verified/${param}`,
    {},
  );
  return response.data;
};

export const rejectClaim = async (param: IClaimRejectRequestDTO) => {
  const response = await httpProvider.post<any>('claim/reject-claim', param);
  return response.data;
};

export const approveClaim = async (param: number) => {
  const response = await httpProvider.post<any>(`claim/approve/${param}`, {});
  return response.data;
};

export const settleClaim = async (param: IClaimPaymentRequestDTO) => {
  const response = await httpProvider.post<any>('claim/settle-claim', param);
  return response.data;
};

export const updateClaim = async (param: IClaimUpdateRequestDTO) => {
  const response = await httpProvider.put<any>('claim/update', param);
  return response.data;
};
