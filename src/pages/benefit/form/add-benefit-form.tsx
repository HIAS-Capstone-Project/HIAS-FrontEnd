import { Checkbox, Form, Input, Modal } from 'antd';
import { FormProps } from '../types';

const AddBenefitForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, licenses } = props;

  const options = licenses.map(license => {
    return {
      label: license.licenseName,
      value: license.licenseNo,
    };
  });

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
        <Form.Item
          name="licenseNos"
          label="Chọn các giấy tờ liên quan:"
          rules={[
            {
              required: true,
              message:
                'Hãy chọn ít nhất một loại giấy tờ cần thiết cho quyền lợi!',
            },
          ]}
        >
          <Checkbox.Group options={options} />
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
