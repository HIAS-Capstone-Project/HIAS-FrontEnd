import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { UpdateFormProps } from '../types';

const EditBenefitItemForm = (props: UpdateFormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    currentRowData,
    viewMode,
    benefits,
  } = props;

  useEffect(() => {
    form.setFieldsValue(currentRowData);
  }, [form, currentRowData]);
  const { benefitItemNo } = currentRowData;

  return (
    <Modal
      getContainer={false}
      title="Chỉnh sửa danh mục quyền lợi"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        key={benefitItemNo}
        form={form}
        layout="vertical"
        disabled={viewMode}
        initialValues={currentRowData}
      >
        <Form.Item
          name="benefitItemCode"
          label="Mã danh mục quyền lợi:"
          rules={[
            { required: true, message: 'Hãy nhập vào mã danh mục quyền lợi!' },
          ]}
        >
          <Input
            disabled
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã danh mục quyền lợi"
          />
        </Form.Item>
        <Form.Item
          name="benefitItemName"
          label="Tên danh mục quyền lợi:"
          rules={[
            { required: true, message: 'Hãy nhập vào tên danh mục quyền lợi!' },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên danh mục quyền lợi"
          />
        </Form.Item>

        <Form.Item
          name="benefitNo"
          label="Tên quyền lợi:"
          rules={[{ required: true, message: 'Hãy chọn tên quyền lợi!' }]}
        >
          <Select
            disabled
            showSearch
            size="large"
            placeholder="Chọn tên quyền lợi"
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
            {benefits.map(benefit => {
              return (
                <Select.Option
                  key={benefit.benefitNo}
                  value={benefit.benefitNo}
                >
                  {benefit.benefitName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="budgetAmount"
          label="Chi phí được chi trả"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào chi phí được chi trả!',
            },
          ]}
        >
          <InputNumber
            controls={false}
            style={{ width: '100%' }}
            min={0}
            autoComplete="false"
            size="large"
            placeholder="Nhập vào chi phí được chi trả"
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

export default EditBenefitItemForm;
