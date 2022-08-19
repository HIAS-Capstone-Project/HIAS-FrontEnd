import httpProvider from 'http/http-provider';
import { IBusinessSector } from 'pages/client/types';

export const getBusinessSectors = async () => {
  const response = await httpProvider.get<IBusinessSector[]>(
    'business-sector/find-all',
  );
  return response.data;
};
