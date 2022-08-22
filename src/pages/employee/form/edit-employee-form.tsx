import { DatePicker, Form, Input, Modal, Select } from 'antd';
import DateFormat from 'constants/date-format';
import _ from 'lodash';
import moment from 'moment';
import { IEmploymentType, UpdateFormProps } from 'pages/employee/types';
import { useEffect, useMemo, useState } from 'react';

const EditEmployeeForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    departments,
    currentRowData,
    viewMode,
  } = props;

  const { employeeID, departmentNo, dob } = currentRowData;

  const options = useMemo(() => {
    return departments.find(item => item.departmentNo === departmentNo);
  }, [departments, departmentNo]);

  const [employmentTypes, setEmploymentTypes] = useState<IEmploymentType[]>([]);

  const initialValues = useMemo(() => {
    return {
      ...currentRowData,
      dateOfBirth: moment(dob, DateFormat.DDMMYYYY) || undefined,
    };
  }, [currentRowData, dob]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  useEffect(() => {
    if (!_.isEmpty(options)) {
      setEmploymentTypes(options?.list || []);
    }
  }, [options]);

  return (
    <Modal
      title={viewMode ? 'Thông tin nhân viên' : 'Chỉnh sửa nhân viên'}
      visible={visible}
      onCancel={() => {
        onCancel();
        setEmploymentTypes([]);
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        key={employeeID}
        initialValues={initialValues}
        form={form}
        layout="vertical"
        disabled={viewMode}
      >
        <Form.Item name="employeeID" label="Mã nhân viên:">
          <Input
            disabled
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã nhân viên"
          />
        </Form.Item>
        <Form.Item
          name="employeeName"
          label="Tên nhân viên:"
          rules={[{ required: true, message: 'Hãy nhập vào tên nhân viên!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên nhân viên"
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Ngày sinh:"
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: 'Hãy chọn lại ngày sinh!',
            },
          ]}
        >
          <DatePicker
            disabledDate={current => current.isAfter(moment())}
            placeholder="Ngày sinh"
            size="large"
            format={DateFormat.DDMMYYYY}
          />
        </Form.Item>

        <Form.Item
          name="departmentNo"
          label="Tên bộ phận:"
          rules={[{ required: true, message: 'Hãy chọn tên bộ phận!' }]}
        >
          <Select
            onSelect={(departmentNo: number) => {
              const option = departments.find(
                item => item.departmentNo === departmentNo,
              );
              setEmploymentTypes(option?.list || []);
              form.resetFields(['employmentTypeNo']);
              form.setFieldsValue({ employmentTypeNo: undefined });
            }}
            showSearch
            size="large"
            placeholder="Chọn tên bộ phận"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare(
                  (optionB!.children as unknown as string).toLowerCase(),
                )
            }
          >
            {departments.map(department => {
              return (
                <Select.Option
                  key={department.departmentNo}
                  value={department.departmentNo}
                >
                  {department.departmentName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="employmentTypeNo"
          label="Tên chức vụ:"
          rules={[{ required: true, message: 'Hãy chọn tên chức vụ!' }]}
        >
          <Select
            disabled={_.isEmpty(employmentTypes)}
            showSearch
            size="large"
            placeholder="Chọn tên chức vụ"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                ?.toLowerCase()
                ?.localeCompare(
                  (optionB!.children as unknown as string).toLowerCase(),
                )
            }
          >
            {employmentTypes?.map((employmentType: IEmploymentType) => (
              <Select.Option
                key={employmentType.employmentTypeNo}
                value={employmentType.employmentTypeNo}
              >
                {employmentType.employmentTypeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào địa chỉ của nhân viên!',
            },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào địa chỉ của nhân viên"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của nhân viên!',
            },
            {
              type: 'email',
              message: 'Email của nhân viên không hợp lệ!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào email của nhân viên"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào số điện thoại của nhân viên!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số điện thoại của nhân viên"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEmployeeForm;
