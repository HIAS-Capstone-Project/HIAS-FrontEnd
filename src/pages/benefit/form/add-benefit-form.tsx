import { Form, Input, Modal } from 'antd';
import { FormProps } from '../types';

const AddBenefitForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading } = props;

  return (
    <Modal
      title="Thêm quyền lợi"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Thêm"
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="benefitCode"
          label="Mã quyền lợi:"
          rules={[{ required: true, message: 'Hãy nhập vào mã quyền lợi!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã quyền lợi"
          />
        </Form.Item>
        <Form.Item
          name="benefitName"
          label="Tên quyền lợi:"
          rules={[{ required: true, message: 'Hãy nhập vào tên quyền lợi!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên quyền lợi"
          />
        </Form.Item>
        <Form.Item name="remark" label="Ghi chú:">
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào ghi chú"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBenefitForm;
