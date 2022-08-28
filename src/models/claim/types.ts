import { ILicense } from 'models/license/types';
import { IClaim, IClaimDocumentRequestDTO } from 'pages/claim/types';
import { IEmployee } from 'pages/employee/types';

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
  serviceProviderNo: number;
  claimDocumentRequestDTOS: IClaimDocumentRequestDTO[];
}

export interface IClaimHistoryResponseDTO {
  actionType: string;
  claimNo: number;
  claimRequestHistoryNo: number;
  createdOn: string;
  employeeNo: number;
  employeeResponseDTO: IEmployee;
  fromStatusCode: string;
  modifiedOn: string;
  remark: string;
  toStatusCode: string;
}
