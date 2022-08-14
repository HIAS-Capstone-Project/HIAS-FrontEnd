import { IMember } from 'pages/member/types';

export interface IMemberResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IMember[];
  totalPage: number;
}
