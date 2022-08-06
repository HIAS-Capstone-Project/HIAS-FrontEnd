import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { UpdateFormProps } from '../types';

const EditBenefitForm = (props: UpdateFormProps) => {
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
  const { benefitNo } = currentRowData;

  return (
    <Modal
      title="Chỉnh sửa quyền lợi"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        key={benefitNo}
        form={form}
        layout="vertical"
        disabled={viewMode}
        initialValues={currentRowData}
      >
        <Form.Item
          name="benefitCode"
          label="Mã quyền lợi:"
          rules={[{ required: true, message: 'Hãy nhập vào mã quyền lợi!' }]}
        >
          <Input
            disabled
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

export default EditBenefitForm;
