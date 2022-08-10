import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormProps } from '../types';

const AddBenefitItemForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, benefits } = props;

  return (
    <Modal
      getContainer={false}
      title="Thêm danh mục quyền lợi"
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
          name="benefitItemCode"
          label="Mã danh mục quyền lợi:"
          rules={[
            { required: true, message: 'Hãy nhập vào mã danh mục quyền lợi!' },
          ]}
        >
          <Input
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
          <InputNumber<number>
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

export default AddBenefitItemForm;
