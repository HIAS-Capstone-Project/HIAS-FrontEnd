import { Form, Input, Modal, Select } from 'antd';
import { FormProps } from '../types';

const options = [
  {
    value: 'RE001',
    children: 'Chứng từ không đầy đủ',
  },
  {
    value: 'RE002',
    children: 'Chứng từ không hợp lệ',
  },
  {
    value: 'RE003',
    children: 'Lý do khác',
  },
];

const ReturnForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, claim } = props;

  return (
    <Modal
      title="Lý do trả lại yêu cầu bồi thường"
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Trả lại yêu cầu"
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="statusReasonCode"
          label="Loại lý do:"
          rules={[{ required: true, message: 'Hãy chọn loại lý do' }]}
        >
          <Select
            // options={options}
            showSearch
            size="large"
            placeholder="Chọn loại lý do"
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
            {options.map(option => {
              return (
                <Select.Option key={option.value} value={option.value}>
                  {option.children}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="returnReason"
          label="Chi tiết lý do:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào chi tiết lý do trả lại yêu cầu',
            },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào chi tiết lý do trả lại yêu cầu"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReturnForm;
