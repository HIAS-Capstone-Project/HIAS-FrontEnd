import { FormInstance, TablePaginationConfig } from 'antd';

export interface IClient {
  address: string;
  clientName: string;
  clientNo: number;
  corporateID: string;
  email: string;
  endDate: string;
  phoneNumber: string;
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
  currentRowData: IClient;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
