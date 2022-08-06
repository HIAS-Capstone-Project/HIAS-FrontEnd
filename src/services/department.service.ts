import httpProvider from 'http/http-provider';
import { IDepartment } from 'pages/employee/types';

export const getDepartments = async () => {
  const response = await httpProvider.get<IDepartment[]>('department/find-all');
  return response.data;
};
