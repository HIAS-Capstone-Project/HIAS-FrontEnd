import httpProvider from 'http/http-provider';
import { ILicense } from 'models/license/types';

export const getAllLicense = async () => {
  const response = await httpProvider.get<ILicense[]>('license/find-all');
  return response.data;
};

export const getLicensesByBenefit = async (benefitNo: number) => {
  const response = await httpProvider.get<ILicense[]>(
    `license/find-by-benefit-no/${benefitNo}`,
  );
  return response.data;
};
