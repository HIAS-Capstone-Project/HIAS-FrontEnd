import { FormInstance, TablePaginationConfig } from 'antd';

export interface IEmployee {
  address: string;
  departmentNo: number;
  dob: string;
  email: string;
  employeeID: string;
  employeeName: string;
  employeeNo: number;
  phoneNumber: string;
  employmentTypeNo: number;
}

export interface IDepartment {
  departmentCode: string;
  departmentName: string;
  departmentNo: number;
  list: IEmploymentType[];
}

export interface IEmploymentType {
  employmentTypeNo: number;
  employmentTypeCode: string;
  employmentTypeName: string;
}

export interface FormProps {
  departments: IDepartment[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  departments: IDepartment[];
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IEmployee;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
