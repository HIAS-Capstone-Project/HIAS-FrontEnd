import { IClient } from 'pages/client/types';

export interface IClientResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IClient[];
  totalPage: number;
}
