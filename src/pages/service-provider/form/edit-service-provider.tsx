import { Modal, Form, Input, DatePicker } from 'antd';
import DateFormat from 'constants/date-format';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { UpdateFormProps } from '../types';

const EditServiceProviderForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    currentRowData,
    viewMode,
  } = props;
  const {
    serviceProviderID,
    serviceProviderName,
    email,
    address,
    startDate,
    endDate,
  } = currentRowData;

  const initialValues = useMemo(() => {
    return {
      serviceProviderID,
      serviceProviderName,
      email,
      address,
      timeRange: [
        moment(startDate, DateFormat.YYYYMMDDT),
        moment(endDate, DateFormat.YYYYMMDDT),
      ],
    };
  }, [serviceProviderID]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Modal
      title="Chỉnh sửa Cơ Sở Khám Chữa Bệnh"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        key={serviceProviderID}
        initialValues={initialValues}
        form={form}
        layout="vertical"
        disabled={viewMode}
      >
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
            disabled
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
            {
              type: 'email',
              message: 'Email của cơ sở khám chữa bệnh không hợp lệ!',
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

export default EditServiceProviderForm;
