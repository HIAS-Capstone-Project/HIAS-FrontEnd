import { Form, Input, InputNumber, Modal } from 'antd';
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
          label="Chi phí yêu cầu bồi thường:"
        >
          <Input
            disabled
            size="large"
            placeholder="Nhập vào chi phí yêu cầu bồi thường"
          />
        </Form.Item>
        <Form.Item
          name="paymentAmount"
          label="Số tiền thanh toán:"
          rules={[
            { required: true, message: 'Hãy nhập vào số tiền sẽ thanh toán' },
            {
              type: 'number',
              min: -1,
              message: 'Số tiên sẽ thanh toán phải lớn hơn 0',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            controls={false}
            formatter={value => {
              let res = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              const index = res.indexOf('.');
              if (index !== -1) {
                const decimal = res
                  .slice(index)
                  .replace(/\$\s?|(,*)/g, '')
                  .slice(0, 4);
                res = res.slice(0, index);
                return res.concat(decimal);
              }
              return res;
            }}
            parser={value => Number(value!.replace(/\$\s?|(,*)/g, ''))}
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số tiền sẽ thanh toán"
            addonAfter={<>VNĐ</>}
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
