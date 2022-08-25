import { FormInstance, TablePaginationConfig } from 'antd';
import { IEmployee } from 'pages/employee/types';

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
  employeeResponseDTOS: IEmployee[];
}

export interface FormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  businessSectors: IBusinessSector[];
  businessEmployees: IEmployee[];
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
  businessEmployees: IEmployee[];
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
