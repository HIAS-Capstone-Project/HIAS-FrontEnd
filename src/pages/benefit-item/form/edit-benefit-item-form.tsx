import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect, useMemo } from 'react';
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
    readonly,
  } = props;

  useEffect(() => {
    form.setFieldsValue(currentRowData);
  }, [form, currentRowData]);
  const { benefitItemNo } = currentRowData;

  const propsModal = useMemo(() => {
    if (readonly) return { footer: null };
    else return {};
  }, [readonly]);

  return (
    <Modal
      getContainer={false}
      title={
        viewMode
          ? 'Thông tin danh mục quyền lợi'
          : 'Chỉnh sửa danh mục quyền lợi'
      }
      {...propsModal}
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
            {
              type: 'number',
              min: -1,
              message: 'Chi phí yêu cầu bồi thường phải lớn hơn 0',
            },
          ]}
        >
          <InputNumber
            controls={false}
            style={{ width: '100%' }}
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
            placeholder="Nhập vào chi phí đã chi trả"
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

export default EditBenefitItemForm;
