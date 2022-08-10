import { IBenefitItem } from 'pages/benefit-item/types';

export interface IBenefitItemResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IBenefitItem[];
  totalPage: number;
}
