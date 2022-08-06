import { IBenefit } from 'pages/benefit/types';

export interface IBenefitResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IBenefit[];
  totalPage: number;
}
