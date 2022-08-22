import { Form, Input, Modal, Select } from 'antd';
import { FormProps } from '../types';

const RejectForm = (props: FormProps) => {
  const { form, visible, onCancel, onOk, confirmLoading, claim } = props;

  return (
    <Modal
      title="Lý do từ chối yêu cầu bồi thường"
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Từ chối yêu cầu"
      maskClosable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="statusReasonCode"
          label="Loại lý do:"
          rules={[{ required: true, message: 'Hãy chọn loại lý do' }]}
        >
          <Select
            // onSelect={(departmentNo: number) => {
            //   const option = departments.find(
            //     item => item.departmentNo === departmentNo,
            //   );
            //   setEmploymentTypes(option?.list || []);
            //   form.resetFields(['employmentTypeNo']);
            // }}
            showSearch
            size="large"
            placeholder="Chọn kiểu lý do"
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
            {/* {departments.map(department => {
              return (
                <Select.Option
                  key={department.departmentNo}
                  value={department.departmentNo}
                >
                  {department.departmentName}
                </Select.Option>
              );
            })} */}
          </Select>
        </Form.Item>
        <Form.Item
          name="rejectReason"
          label="Lí do:"
          rules={[
            { required: true, message: 'Hãy nhập vào lí do từ chối yêu cầu' },
          ]}
        >
          <Input.TextArea
            autoComplete="false"
            size="large"
            placeholder="Nhập vào lí do từ chối yêu cầu"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectForm;
