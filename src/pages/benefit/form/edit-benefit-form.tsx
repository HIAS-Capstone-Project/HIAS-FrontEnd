import { Checkbox, Form, Input, Modal } from 'antd';
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
    licenses,
  } = props;

  const options = licenses.map(license => {
    return {
      label: license.licenseName,
      value: license.licenseNo,
    };
  });

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

export default EditBenefitForm;
