import { DatePicker, Form, Input, Modal } from 'antd';
import DateFormat from 'constants/date-format';
import { FormProps } from '../types';

const AddServiceProviderForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading } = props;

  return (
    <Modal
      title="Thêm Cơ Sở Khám Chữa Bệnh"
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
          name="serviceProviderID"
          label="Mã CSKCB:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào mã cơ sở khám chữa bệnh!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã cơ sở khám chữa bệnh"
          />
        </Form.Item>
        <Form.Item
          name="serviceProviderName"
          label="Tên CSKCB:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào tên cơ sở khám chữa bệnh!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên cơ sở khám chữa bệnh"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của cơ sở khám chữa bệnh!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào email của cơ sở khám chữa bệnh"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào địa chỉ của cơ sở khám chữa bệnh!',
            },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào địa chỉ của cơ sở khám chữa bệnh"
          />
        </Form.Item>
        <Form.Item
          name="timeRange"
          label="Thời gian:"
          rules={[
            {
              type: 'array' as const,
              required: true,
              message: 'Hãy chọn lại thời gian!',
            },
          ]}
        >
          <DatePicker.RangePicker
            size="large"
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            format={DateFormat.DDMMYYYY}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceProviderForm;
