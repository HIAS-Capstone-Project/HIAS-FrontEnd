import { FormInstance, TablePaginationConfig } from 'antd';

export interface IServiceProvider {
  address: string;
  email: string;
  endDate: string;
  serviceProviderID: string;
  serviceProviderName: string;
  serviceProviderNo: number;
  startDate: string;
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
  currentRowData: IServiceProvider;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
