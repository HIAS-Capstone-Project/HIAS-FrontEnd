import { FormInstance, TablePaginationConfig } from 'antd';
import { IBenefit } from 'pages/benefit/types';

export interface IBenefitItem {
  benefitItemCode: string;
  benefitItemName: string;
  benefitItemNo: number;
  benefitNo: number;
  remark: string;
  budgetAmount: number;
}

export interface FormProps {
  benefits: IBenefit[];
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

export interface UpdateFormProps {
  benefits: IBenefit[];
  viewMode: boolean;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IBenefitItem;
}

export interface QueryParams {
  pagination?: TablePaginationConfig;
  key?: string;
}
