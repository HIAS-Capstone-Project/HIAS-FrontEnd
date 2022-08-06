import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { UpdateFormProps } from '../types';

const EditClientForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    currentRowData,
    viewMode,
  } = props;

  useEffect(() => {
    form.setFieldsValue(currentRowData);
  }, [form, currentRowData]);
  const { corporateID } = currentRowData;

  return (
    <Modal
      title="Chỉnh sửa doanh nghiệp"
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
        initialValues={currentRowData}
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
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của doanh nghiệp!',
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
              message: 'Hãy nhập vào số điện thoại của doanh nghiệp!',
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
