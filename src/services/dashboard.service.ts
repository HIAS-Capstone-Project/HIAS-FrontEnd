import { IFilter } from 'components/chart/PaymentChart/types';
import httpProvider from 'http/http-provider';
import queryString from 'query-string';

export const chartAge = async () => {
  const response = await httpProvider.get<any>('chart/member-by-age');
  return response;
};

export const chartGender = async () => {
  const response = await httpProvider.get<any>('chart/member-by-gender');
  return response;
};

export const chartOnboardYear = async () => {
  const response = await httpProvider.get<any>('chart/member-by-onboard-year');
  return response;
};

export const businessSector = async () => {
  const response = await httpProvider.get<any>('chart/business-sector');
  return response;
};

export const claimByStatusChart = async () => {
  const response = await httpProvider.get<any>('chart/claim-by-all-status');
  return response;
};

export const claimBySpecialStatusChart = async () => {
  const response = await httpProvider.get<any>('chart/claim-by-special-status');
  return response;
};

export const locationChart = async () => {
  const response = await httpProvider.get<any>('chart/member-by-location');
  return response;
};

export const policyByUsageChart = async () => {
  const response = await httpProvider.get<any>('chart/policy-by-usage');
  return response;
};

export const findAll = async () => {
  const response = await httpProvider.get<any>('chart/find-all');
  return response;
};

export const paymentChart = async (params?: IFilter) => {
  const response = await httpProvider.get<any>(
    `chart/payment?${queryString.stringify({ ...params })}`,
  );
  return response.data;
};
