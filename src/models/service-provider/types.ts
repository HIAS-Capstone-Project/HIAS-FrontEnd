import { IServiceProvider } from 'pages/service-provider/types';

export interface IServiceProviderResponse {
  listItems: IServiceProvider[];
  pageIndex: number;
  totalItems: number;
  totalPage: number;
}
