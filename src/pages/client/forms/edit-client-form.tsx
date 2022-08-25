import { Checkbox, Form, Input, Modal, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { isVietnamesePhoneNumber } from 'utils';
import { UpdateFormProps } from '../types';

const { Option } = Select;

const EditClientForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    currentRowData,
    viewMode,
    businessSectors,
    businessEmployees,
  } = props;

  const options = businessSectors.map(businessSector => {
    return {
      label: businessSector.businessSectorName,
      value: businessSector.businessSectorNo,
    };
  });

  const initialValues = useMemo(() => {
    return {
      ...currentRowData,
      employeeNos: currentRowData.employeeResponseDTOS?.map(
        item => item.employeeNo,
      ),
    };
  }, [currentRowData.clientNo]);

  useEffect(() => {
    form.setFieldsValue(currentRowData);
  }, [form, currentRowData]);
  const { corporateID } = currentRowData;

  return (
    <Modal
      title={viewMode ? 'Thông tin doanh nghiệp' : 'Chỉnh sửa doanh nghiệp'}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        key={corporateID}
        form={form}
        layout="vertical"
        disabled={viewMode}
        initialValues={initialValues}
      >
        <Form.Item
          name="corporateID"
          label="Mã doanh nghiệp:"
          rules={[{ required: true, message: 'Hãy nhập vào mã doanh nghiệp!' }]}
        >
          <Input
            disabled
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="clientName"
          label="Tên doanh nghiệp:"
          rules={[
            { required: true, message: 'Hãy nhập vào tên doanh nghiệp!' },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên doanh nghiệp"
          />
        </Form.Item>

        <Form.Item
          name="businessSectorNos"
          label="Chọn các ngành nghề liên quan:"
          rules={[
            {
              required: true,
              message: 'Hãy chọn ít nhất một loại ngành nghề của doanh nghiệp!',
            },
          ]}
        >
          <Checkbox.Group options={options} />
        </Form.Item>

        <Form.Item
          name="employeeNos"
          label="Chọn các nhân viên kinh doanh:"
          rules={[
            {
              required: true,
              message: 'Hãy chọn ít nhất một nhân viên kinh doanh',
            },
          ]}
        >
          <Select
            mode="multiple"
            // style={{ width: '100%' }}
            placeholder="Hãy chọn nhân viên kinh doanh làm việc với doanh nghiệp"
            size="large"
          >
            {businessEmployees.map(item => {
              return (
                <Option key={item.employeeNo} value={item.employeeNo}>
                  {item.employeeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của doanh nghiệp!',
            },
            {
              type: 'email',
              message: 'Email của doanh nghiệp không hợp lệ!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào email của doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào địa chỉ của doanh nghiệp!',
            },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào địa chỉ của doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào số điện thoại của doanh nghiệp',
            },
            {
              validator: (dump, value: number) => {
                if (!value) return Promise.resolve();
                if (isVietnamesePhoneNumber(value)) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: 'Số điện thoại không đúng',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số điện thoại của doanh nghiệp"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClientForm;
