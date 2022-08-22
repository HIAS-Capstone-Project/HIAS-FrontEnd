import { Checkbox, Form, Input, Modal } from 'antd';
import { isVietnamesePhoneNumber } from 'utils';
import { FormProps } from '../types';

const AddClientForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, businessSectors } =
    props;

  const options = businessSectors.map(businessSector => {
    return {
      label: businessSector.businessSectorName,
      value: businessSector.businessSectorNo,
    };
  });

  return (
    <Modal
      title="Thêm doanh nghiệp"
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
          name="corporateID"
          label="Mã doanh nghiệp:"
          rules={[{ required: true, message: 'Hãy nhập vào mã doanh nghiệp!' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="clientName"
          label="Tên doanh nghiệp:"
          rules={[
            { required: true, message: 'Hãy nhập vào tên doanh nghiệp!' },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên doanh nghiệp"
          />
        </Form.Item>

        <Form.Item
          name="businessSectorNos"
          label="Chọn các ngành nghề liên quan:"
          rules={[
            {
              required: true,
              message: 'Hãy chọn ít nhất một loại ngành nghề của doanh nghiệp!',
            },
          ]}
        >
          <Checkbox.Group options={options} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của doanh nghiệp!',
            },
            {
              type: 'email',
              message: 'Email của doanh nghiệp không hợp lệ!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào email của doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào địa chỉ của doanh nghiệp!',
            },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào địa chỉ của doanh nghiệp"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào số điện thoại của doanh nghiệp',
            },
            {
              validator: (dump, value: number) => {
                if (!value) return Promise.resolve();
                if (isVietnamesePhoneNumber(value)) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: 'Số điện thoại không đúng',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số điện thoại của doanh nghiệp"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClientForm;
