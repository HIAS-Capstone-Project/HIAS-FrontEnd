import { ILicense } from 'models/license/types';
import { IClaim, IClaimDocumentRequestDTO } from 'pages/claim/types';
import { IEmployee } from 'pages/employee/types';
import { IMember } from 'pages/member/types';

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

export interface IClaimHistoryResponseDTO {
  actionType: string;
  claimNo: number;
  claimRequestHistoryNo: number;
  createdOn: string;
  employeeNo: number;
  employeeResponseDTO: IEmployee;
  fromStatusCode: string;
  memberResponseDTO: IMember;
  modifiedOn: string;
  remark: string;
  toStatusCode: string;
}

export interface IEmployeeResponseDTO {
  address: string;
  departmentNo: number;
  dob: string;
  email: string;
  employeeID: string;
  employeeName: string;
  employeeNo: number;
  employmentTypeNo: number;
  genderEnum: string;
  phoneNumber: string;
}

export interface IBenefitItemResponseDTO {
  benefitItemCode: string;
  benefitItemName: string;
  benefitItemNo: number;
  benefitNo: number;
  budgetAmount: number;
  remark: string;
}

export interface ILicenseResponseDTO {
  fileUrl: string;
  label: string;
  licenseName: string;
  licenseNo: number;
  remark: string;
}

export interface IBenefitResponseDTO {
  benefitCode: string;
  benefitItemNos: number[];
  benefitItemResponseDTOS: IBenefitItemResponseDTO[];
  benefitName: string;
  benefitNo: number;
  licenseResponseDTOS: ILicenseResponseDTO[];
  remark: string;
}

export interface IMemberResponseDTO {
  address: string;
  bankAccountNo: string;
  bankNo: number;
  benefitResponseDTOS: IBenefitResponseDTO[];
  clientNo: number;
  districtNo: number;
  dob: string;
  email: string;
  endDate: string;
  genderEnum: string;
  healthCardNo: string;
  memberName: string;
  memberNo: number;
  phoneNumber: string;
  policyNo: number;
  staffID: string;
  startDate: string;
}
