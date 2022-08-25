import { FormInstance, TablePaginationConfig } from 'antd';
import { ILicense } from 'models/license/types';

export interface IBenefit {
  benefitCode: string;
  benefitName: string;
  benefitNo: number;
  remark: string;
  licenseNos: number[];
}

export interface FormProps {
  licenses: ILicense[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  readonly: boolean;
  licenses: ILicense[];
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
