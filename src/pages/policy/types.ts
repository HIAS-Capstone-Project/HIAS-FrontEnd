import { FormInstance, TablePaginationConfig } from 'antd';
import { IClient } from 'pages/client/types';

export interface IPolicy {
  clientNo: number;
  policyCode: string;
  policyName: string;
  policyNo: number;
  remark: string;
}

export interface FormProps {
  clients: IClient[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
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
