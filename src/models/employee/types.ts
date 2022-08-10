import { IEmployee } from 'pages/employee/types';

export interface IEmployeeResponse {
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  rows: IEmployee[];
  totalPage: number;
}
