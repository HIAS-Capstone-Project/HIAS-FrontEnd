import httpProvider from 'http/http-provider';
import { IEmployeeResponse } from 'models/employee/types';
import { IEmployee, IEmploymentType, QueryParams } from 'pages/employee/types';
import { IMember } from 'pages/member/types';
import queryString from 'query-string';

export const getEmployees = async (params: QueryParams) => {
  const { pagination, key } = params;
  const query = {
    searchValue: key,
    page: pagination?.current ? pagination?.current - 1 : 0,
    size: pagination?.pageSize,
  };
  const response = await httpProvider.get<IEmployeeResponse>(
    `employee/search?${queryString.stringify({ ...query })}`,
  );
  return response.data;
};

export const getBenefitsByMember = async (memberNo: number) => {
  const response = await httpProvider.get<IMember[]>(
    `employee/find-detail?employeeNo=${memberNo}`,
  );
  return response.data;
};

export const addEmployee = async (param: IEmployee) => {
  const response = await httpProvider.post<IEmployee>('employee/create', param);
  return response.data;
};

export const updateEmployee = async (param: IEmployee) => {
  const response = await httpProvider.put<IEmployee>('employee/update', param);
  return response.data;
};

export const deleteEmployee = async (employeeNo: number) => {
  const response = await httpProvider.delete<IEmployee>(
    `employee/delete?employeeNo=${employeeNo}`,
  );
  return response.data;
};

export const getEmploymentTypes = async () => {
  const response = await httpProvider.get<IEmploymentType[]>(
    'employment-type/find-all',
  );
  return response.data;
};
