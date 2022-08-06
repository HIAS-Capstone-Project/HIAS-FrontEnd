import { FormInstance, TablePaginationConfig } from 'antd';

export interface IBenefit {
  benefitCode: string;
  benefitName: string;
  benefitNo: number;
  remark: string;
}

export interface FormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IBenefit;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
