import { Form, Input, Modal } from 'antd';
import { FormProps } from '../types';

const SettleForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, claim } = props;

  return (
    <Modal
      title="Thông tin thanh toán"
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Thanh toán"
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          initialValue={claim.claimAmount}
          name="claimAmount"
          label="Chi phí đã chi trả:"
        >
          <Input
            readOnly={true}
            size="large"
            placeholder="Nhập vào chi phí đã chi trả"
          />
        </Form.Item>
        <Form.Item
          name="paymentAmount"
          label="Số tiền thanh toán:"
          rules={[
            { required: true, message: 'Hãy nhập vào số tiền sẽ thanh toán' },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số tiền sẽ thanh toán"
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

export default SettleForm;
