import { FormInstance, TablePaginationConfig } from 'antd';
import { IBenefit } from 'pages/benefit/types';
import { IClient } from 'pages/client/types';

export interface IPolicy {
  clientNo: number;
  policyCode: string;
  policyName: string;
  policyNo: number;
  remark: string;
  benefitNos: number[];
}

export interface FormProps {
  benefits: IBenefit[];
  clients: IClient[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  readonly: boolean;
  benefits: IBenefit[];
  clients: IClient[];
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IPolicy;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
