import { Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { UpdateFormProps } from '../types';

const EditPolicyForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    currentRowData,
    viewMode,
    clients,
  } = props;

  useEffect(() => {
    form.setFieldsValue(currentRowData);
  }, [form, currentRowData]);

  const { policyNo } = currentRowData;

  return (
    <Modal
      title="Chỉnh sửa chính sách"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        autoComplete="off"
        key={policyNo}
        form={form}
        layout="vertical"
        disabled={viewMode}
        initialValues={currentRowData}
      >
        <Form.Item
          name="policyCode"
          label="Mã chính sách:"
          rules={[{ required: true, message: 'Hãy nhập vào mã chính sách!' }]}
        >
          <Input disabled size="large" placeholder="Nhập vào mã chính sách" />
        </Form.Item>
        <Form.Item
          name="policyName"
          label="Tên chính sách:"
          rules={[{ required: true, message: 'Hãy nhập vào tên chính sách!' }]}
        >
          <Input size="large" placeholder="Nhập vào tên chính sách" />
        </Form.Item>
        <Form.Item
          name="clientNo"
          label="Tên doanh nghiệp:"
          rules={[{ required: true, message: 'Hãy chọn tên doanh nghiệp!' }]}
        >
          <Select
            disabled
            showSearch
            size="large"
            placeholder="Chọn tên doanh nghiệp"
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
            {clients.map(client => {
              return (
                <Select.Option key={client.clientNo} value={client.clientNo}>
                  {client.clientName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="remark" label="Ghi chú:">
          <Input.TextArea size="large" placeholder="Nhập vào ghi chú" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPolicyForm;
