import { FormInstance, TablePaginationConfig, UploadFile } from 'antd';
import { IBenefitDTOS } from 'models/benefit/types';
import { IClaimDocumentResponseDTO } from 'models/claim/types';
import { IClient } from 'pages/client/types';
import { IMember } from 'pages/member/types';
import { IPolicy } from 'pages/policy/types';
import { IServiceProvider } from 'pages/service-provider/types';
import { IEmployee } from './../employee/types';

export interface IClaim {
  accountant: IEmployee;
  admissionFromDate: string;
  admissionToDate: string;
  approvedDate: string;
  approver: IEmployee;
  benefitNo: number;
  benefitResponseDTO: IBenefitDTOS;
  businessAppraisal: IEmployee;
  businessAppraisalBy: number;
  businessAppraisalDate: string;
  claimAmount: number;
  claimDocumentResponseDTOS: IClaimDocumentResponseDTO[];
  claimID: string;
  claimNo: number;
  clientResponseDTO: IClient;
  createdOn: string;
  description: string;
  medicalAddress: string;
  medicalAppraisal: IEmployee;
  medicalAppraisalBy: number;
  medicalAppraisalDate: string;
  memberNo: number;
  memberResponseDTO: IMember;
  modifiedOn: string;
  paymentAmount: number;
  paymentDate: string;
  policyResponseDTO: IPolicy;
  recordSource: string;
  rejectReason: string;
  returnReason: string;
  remark: string;
  serviceProviderNo: number;
  serviceProviderResponseDTO: IServiceProvider;
  statusCode: string;
  submittedDate: string;
  visitDate: string;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
  filter?: IFilter;
}

export interface IClaimRejectRequestDTO {
  claimNo: number;
  rejectReason: string;
  statusReasonCode: string;
}

export interface IClaimReturnRequestDTO {
  claimNo: number;
  returnReason: string;
  returnReasonCode: string;
}

export interface IClaimPaymentRequestDTO {
  claimNo: number;
  paymentAmount: number;
  remark: string;
}

export interface IClaimUpdateRequestDTO {
  approvedBy?: number;
  businessAppraisalBy?: number;
  claimNo: number;
  medicalAppraisalBy?: number;
  paidBy?: number;
}

export interface FormProps {
  claim: IClaim;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface IFilter {
  clientNo: number;
  statusCode: string;
}

export interface IClaimDocument {
  licenseNo: number;
  fileList: UploadFile<any>[];
}

export interface IClaimDocumentRequestDTO {
  licenseNo: number;
  fileNames: string[];
  fileUrls: string[];
}
