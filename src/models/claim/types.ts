import { ILicense } from 'models/license/types';
import { IClaim } from 'pages/claim/types';

export interface IClaimDocumentResponseDTO {
  claimDocumentNo: number;
  claimNo: number;
  fileName: string;
  fileUrl: string;
  label: string;
  licenseName: string;
  licenseResponseDTO: ILicense;
  originalFileName: string;
  pathFile: string;
}

export interface IClaimResponse {
  pageNumber: number;
  pageSize: number;
  rows: IClaim[];
  totalElements: number;
  totalPage: number;
}

export interface IClaimSubmitRequestDTO {
  admissionFromDate: string;
  admissionToDate: string;
  visitDate: string;
  benefitNo: number;
  claimAmount: number;
  description: string;
  medicalAddress: string;
  memberNo: number;
  licenseNos: number[];
  serviceProviderNo: number;
}
