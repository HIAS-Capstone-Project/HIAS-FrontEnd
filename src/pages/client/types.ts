import { FormInstance, TablePaginationConfig } from 'antd';

export interface IBusinessSector {
  businessSectorName: string;
  businessSectorNo: number;
}

export interface IClient {
  address: string;
  clientName: string;
  clientNo: number;
  corporateID: string;
  email: string;
  endDate: string;
  phoneNumber: string;
  startDate: string;
  businessSectorNos: number[];
}

export interface FormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  businessSectors: IBusinessSector[];
}

export interface UpdateFormProps {
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IClient;
  businessSectors: IBusinessSector[];
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
