import React from 'react';
import { Form, Input, Select, Modal, FormInstance } from 'antd';

interface AddClientFormPops {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  confirmLoading: boolean;
  form: FormInstance;
}

const AddClientForm = (props: AddClientFormPops) => {
  const { form, visible, onCancel, onOk, confirmLoading } = props;

  return (
    <Modal
      title="Thêm Công Ty"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
    >
      <Form form={form} size="large">
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

export default AddClientForm;
