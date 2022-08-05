import { IPolicy } from 'pages/policy/types';

export interface IPolicyResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IPolicy[];
  totalPage: number;
}
