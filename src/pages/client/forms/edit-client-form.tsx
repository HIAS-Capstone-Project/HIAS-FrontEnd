import React from 'react';
import { Form, Input, Select, Modal, FormInstance } from 'antd';
import { IClientResponse } from 'models';

interface UpdateClientFormPops {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
  currentRowData: IClientResponse;
}

const EditClientForm = (props: UpdateClientFormPops) => {
  const { form, visible, onCancel, onOk, confirmLoading, currentRowData } =
    props;
  const { corporateID, name } = currentRowData;
  return (
    <Modal
      title="Chỉnh sửa công ty"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
    >
      <Form initialValues={{ corporateID, name }} form={form} size="large">
        <Form.Item
          name="corporateID"
          label="Mã công ty:"
          rules={[{ required: true, message: 'Hãy nhập vào mã công ty!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã công ty"
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên công ty:"
          rules={[{ required: true, message: 'Hãy nhập vào tên công ty!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên công ty"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClientForm;
