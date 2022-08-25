import { FormInstance, TablePaginationConfig } from 'antd';
import { IClient } from 'pages/client/types';
import { IPolicy } from 'pages/policy/types';

export interface IBank {
  bankName: string;
  bankNo: number;
}

export interface IDistrict {
  districtName: string;
  districtNo: number;
  provinceNo: number;
}

export interface IProvince {
  provinceNo: number;
  provinceName: string;
  districtResponseDTOS: IDistrict[];
}

export interface IMember {
  address: string;
  bankAccountNo: string;
  bankNo: number;
  clientNo: number;
  districtNo: number;
  dob: string;
  email: string;
  endDate: string;
  genderEnum: string;
  memberName: string;
  memberNo: number;
  phoneNumber: string;
  policyNo: number;
  staffID: string;
  startDate: string;
  healthCardNo: string;
}

export interface FormProps {
  provinces: IProvince[];
  clients: IClient[];
  policies: IPolicy[];
  banks: IBank[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  readonly: boolean;
  provinces: IProvince[];
  clients: IClient[];
  policies: IPolicy[];
  banks: IBank[];
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IMember;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
