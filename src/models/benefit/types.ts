import { ILicense } from 'models/license/types';
import { IBenefitItem } from 'pages/benefit-item/types';
import { IBenefit } from 'pages/benefit/types';

export interface IBenefitResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IBenefitDTOS[];
  totalPage: number;
}

export interface IBenefitDTOS extends IBenefit {
  benefitItemNos: number[];
  benefitItemResponseDTOS: IBenefitItem[];
  licenseResponseDTOS: ILicense[];
}
