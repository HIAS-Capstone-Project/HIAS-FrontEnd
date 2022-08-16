import { IBenefitItem } from 'pages/benefit-item/types';
import { IBenefit } from 'pages/benefit/types';

export interface IBenefitResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IBenefit[];
  totalPage: number;
}

export interface IBenefitByMember extends IBenefit {
  benefitItemNos: number[];
  benefitItemResponseDTOS: IBenefitItem[];
}
