import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Space,
  Table,
  TablePaginationConfig,
} from 'antd';
import Column from 'antd/lib/table/Column';
import DateFormat from 'constants/date-format';
import _ from 'lodash';
import moment from 'moment';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { getDepartments } from 'services/department.service';
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  getEmploymentTypes,
  updateEmployee,
} from 'services/employee.service';
import { NOT_ACCEPTABLE } from './../../constants/http-status';
import AddEmployeeForm from './form/add-employee-form';
import EditEmployeeForm from './form/edit-employee-form';
import { IDepartment, IEmployee, IEmploymentType, QueryParams } from './types';

interface IEmployeePageState {
  employeeList: IEmployee[];
  editEmployeeModalVisible: boolean;
  editEmployeeModalLoading: boolean;
  currentRowData: IEmployee;
  addEmployeeModalVisible: boolean;
  addEmployeeModalLoading: boolean;
  viewMode: boolean;
}

const EmployeePage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    employeeList: [] as IEmployee[],
    editEmployeeModalVisible: false,
    editEmployeeModalLoading: false,
    currentRowData: {} as IEmployee,
    addEmployeeModalVisible: false,
    addEmployeeModalLoading: false,
    viewMode: false,
  };

  const [employeePageState, setEmployeePageState] =
    useState<IEmployeePageState>(initialState);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    showLessItems: true,
    current: 1,
    pageSize: 5,
    position: ['bottomCenter'],
    pageSizeOptions: [5, 10, 20],
    onShowSizeChange(current, size) {
      setPagination({ ...pagination, pageSize: size, current: 1 });
    },
  });

  const {
    employeeList,
    addEmployeeModalVisible,
    addEmployeeModalLoading,
    currentRowData,
    editEmployeeModalVisible,
    editEmployeeModalLoading,
    viewMode,
  } = employeePageState;

  const [key, setKey] = useState<string>('');
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<IEmploymentType[]>([]);
  const dataSource = useMemo(() => {
    return employeeList.map(employee => {
      return {
        ...employee,
        dob: moment(employee.dob).format(DateFormat.DDMMYYYY),
        employmentTypeName: employmentTypes.find(
          item => item.employmentTypeNo === employee.employmentTypeNo,
        )?.employmentTypeName,
        departmentName: departments.find(
          item => item.departmentNo === employee.departmentNo,
        )?.departmentName,
      };
    });
  }, [departments, employmentTypes, employeeList]);

  const getEmployeeList = async (params: QueryParams = {}) => {
    getEmployees(params).then(res => {
      if (res) {
        setEmployeePageState({
          employeeList: res.rows,
          currentRowData: {} as IEmployee,
          addEmployeeModalVisible: false,
          addEmployeeModalLoading: false,
          editEmployeeModalLoading: false,
          editEmployeeModalVisible: false,
          viewMode: false,
        });
        setPagination({
          ...pagination,
          total: res.totalElements,
          current: res.pageNumber + 1,
          pageSize: params.pagination?.pageSize,
          showTotal: (total, range) => {
            if (params.pagination?.pageSize === 1 || res.rows.length === 1)
              return `${range[0]} trong ${total}`;
            return `${range[0]}-${range[1]} trong ${total}`;
          },
        });
      }
    });
  };

  const getDepartmentList = async () => {
    getDepartments().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setDepartments(res);
      }
    });
  };

  const getEmploymentTypeList = async () => {
    getEmploymentTypes().then(res => {
      if (res) {
        if (_.isEmpty(res)) return;
        setEmploymentTypes(res);
      }
    });
  };
  useEffect(() => {
    getDepartmentList();
    getEmploymentTypeList();
    getEmployeeList({ pagination });
  }, []);

  const handleAddEmployee = () => {
    setEmployeePageState({
      ...employeePageState,
      addEmployeeModalVisible: true,
    });
  };

  const handleAddEmployeeOK = async () => {
    formAdd.validateFields().then(() => {
      const fieldValue = formAdd.getFieldsValue();

      const value = {
        ...fieldValue,
        employeeID: fieldValue.employeeID.trim(),
        dob: fieldValue.dateOfBirth.format(DateFormat.DDMMYYYY),
      };
      delete value.dateOfBirth;

      setEmployeePageState({
        ...employeePageState,
        addEmployeeModalLoading: true,
      });

      addEmployee(value)
        .then(res => {
          formAdd.resetFields();
          getEmployeeList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([
              {
                name: fieldName,
                errors: [errorMessage],
                value: formAdd.getFieldValue(fieldName)?.trim(),
              },
            ]);
          }
          setEmployeePageState({
            ...employeePageState,
            addEmployeeModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
  };

  const handleEditEmployee = (row: IEmployee) => {
    setEmployeePageState({
      ...employeePageState,
      editEmployeeModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditEmployeeOK = () => {
    if (viewMode) {
      setEmployeePageState({
        ...employeePageState,
        viewMode: false,
      });
      return;
    }
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();
      const value = {
        ...fieldValue,
        employeeNo: currentRowData.employeeNo,
        dob: fieldValue.dateOfBirth.format(DateFormat.DDMMYYYY),
      };

      setEmployeePageState({
        ...employeePageState,
        editEmployeeModalLoading: true,
        currentRowData: { ...value },
      });

      formEdit.resetFields();
      updateEmployee(value)
        .then(res => {
          getEmployeeList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([{ name: fieldName, errors: [errorMessage] }]);
          }
          setEmployeePageState({
            ...employeePageState,
            editEmployeeModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getEmployeeList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getEmployeeList({ pagination, key: value });
  };

  const handleDeleteEmployee = async (employeeNo: number) => {
    await deleteEmployee(employeeNo);
    getEmployeeList({ pagination });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddEmployee}>
          Thêm Nhân viên
        </Button>
      </span>
      <Input.Search
        placeholder="Nhập vào giá trị muốn tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );

  const handleCancel = () => {
    formAdd.resetFields();
    formEdit.resetFields();
    setEmployeePageState({
      ...employeePageState,
      addEmployeeModalVisible: false,
      editEmployeeModalVisible: false,
      currentRowData: {} as IEmployee,
      viewMode: false,
    });
  };

  return (
    <div className="app-container">
      <Card title={title}>
        <Table
          rowClassName="app-row"
          onRow={record => {
            return {
              onClick: () => {
                setEmployeePageState({
                  ...employeePageState,
                  editEmployeeModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="employeeNo"
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã nhân viên"
            dataIndex="employeeID"
            key="employeeID"
            align="center"
          />
          <Column
            title="Tên nhân viên"
            dataIndex="employeeName"
            key="employeeName"
            align="center"
          />
          <Column title="Ngày sinh" dataIndex="dob" key="dob" align="center" />
          <Column
            title="Tên bộ phận"
            dataIndex="departmentName"
            key="departmentName"
            align="center"
          />
          <Column
            title="Tên chức vụ"
            dataIndex="employmentTypeName"
            key="employmentTypeName"
            align="center"
          />
          <Column
            title="Địa chỉ"
            dataIndex="address"
            key="address"
            align="center"
          />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column
            title="Số điện thoại"
            dataIndex="phoneNumber"
            key="phoneNumber"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IEmployee) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditEmployee(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleDeleteEmployee(row.employeeNo);
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditEmployeeForm
        departments={departments}
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editEmployeeModalVisible}
        confirmLoading={editEmployeeModalLoading}
        onCancel={handleCancel}
        onOk={handleEditEmployeeOK}
      />
      <AddEmployeeForm
        departments={departments}
        form={formAdd}
        visible={addEmployeeModalVisible}
        confirmLoading={addEmployeeModalLoading}
        onCancel={handleCancel}
        onOk={handleAddEmployeeOK}
      />
    </div>
  );
};

export default EmployeePage;