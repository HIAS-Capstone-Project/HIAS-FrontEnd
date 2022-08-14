import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import DateFormat from 'constants/date-format';
import _ from 'lodash';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { FormProps, IDistrict } from '../types';
import { IPolicy } from 'pages/policy/types';

const AddMemberForm = (props: FormProps) => {
  const {
    form,
    visible,
    onCancel,
    onOk,
    confirmLoading,
    clients,
    policies,
    banks,
    provinces,
  } = props;

  const clientList = useMemo(() => {
    return clients.map(client => {
      return {
        ...client,
        policies: policies.filter(
          policie => policie.clientNo === client.clientNo,
        ),
      };
    });
  }, [clients, policies]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [policyList, setPolicyList] = useState<IPolicy[]>([]);
  const [disabledStreet, setDisabledStreet] = useState<boolean>(true);
  const [disabledBankAccountNo, setDisabledBankAccountNo] =
    useState<boolean>(true);

  return (
    <Modal
      width={800}
      title="Thêm thành viên"
      visible={visible}
      onCancel={() => {
        onCancel();
        setDistricts([]);
        setDisabledStreet(true);
        setDisabledBankAccountNo(true);
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Thêm"
      maskClosable={false}
    >
      <Form form={form} layout="vertical" initialValues={{ genderEnum: 'M' }}>
        <Form.Item
          name="staffID"
          label="Mã thành viên:"
          rules={[{ required: true, message: 'Hãy nhập vào mã thành viên' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào mã thành viên"
          />
        </Form.Item>
        <Form.Item
          name="memberName"
          label="Tên thành viên:"
          rules={[{ required: true, message: 'Hãy nhập vào tên thành viên' }]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào tên thành viên"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh:"
            rules={[
              {
                type: 'object' as const,
                required: true,
                message: 'Hãy chọn lại ngày sinh!',
              },
            ]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <DatePicker
              style={{ width: '80%' }}
              disabledDate={current => current.isAfter(moment())}
              placeholder="Ngày sinh"
              size="large"
              format={DateFormat.DDMMYYYY}
            />
          </Form.Item>

          <Form.Item
            name="genderEnum"
            label="Giới tính:"
            rules={[{ required: true, message: 'Hãy chọn giới tính' }]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Radio.Group>
              <Radio value={'M'}>Nam</Radio>
              <Radio value={'F'}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>

        <Form.Item
          required
          name="bankAccountNo"
          label="Số tài khoản:"
          rules={[
            {
              required: !disabledBankAccountNo,
              message: 'Hãy nhập vào số tài khoản của thành viên',
            },
          ]}
        >
          <Input
            addonBefore={
              <Form.Item
                name="bankNo"
                rules={[{ required: true, message: 'Hãy chọn tên ngân hàng' }]}
                noStyle
              >
                <Select
                  onSelect={() => {
                    setDisabledBankAccountNo(false);
                  }}
                  showSearch
                  size="large"
                  placeholder="Chọn tên ngân hàng"
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
                  {banks.map(bank => {
                    return (
                      <Select.Option key={bank.bankNo} value={bank.bankNo}>
                        {bank.bankName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            }
            disabled={disabledBankAccountNo}
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số tài khoản của thành viên"
          />
        </Form.Item>

        <Form.Item label="Địa chỉ: " required style={{ width: '100%' }}>
          <Input.Group compact>
            <Form.Item
              name={['provinceNo']}
              rules={[{ required: true, message: 'Hãy chọn tỉnh' }]}
              style={{ width: '30%' }}
            >
              <Select
                onSelect={(provinceNo: number) => {
                  const option = provinces.find(
                    item => item.provinceNo === provinceNo,
                  );
                  setDistricts(option?.districtResponseDTOS || []);
                  form.resetFields(['districtNo']);
                  form.resetFields(['street']);
                }}
                showSearch
                size="large"
                placeholder="Chọn tỉnh"
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
                {provinces.map(province => {
                  return (
                    <Select.Option
                      key={province.provinceNo}
                      value={province.provinceNo}
                    >
                      {province.provinceName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name={['districtNo']}
              rules={[
                { required: !_.isEmpty(districts), message: 'Hãy chọn huyện' },
              ]}
              style={{ width: '30%' }}
            >
              <Select
                disabled={_.isEmpty(districts)}
                onSelect={() => {
                  setDisabledStreet(false);
                  form.resetFields(['street']);
                }}
                showSearch
                size="large"
                placeholder="Chọn huyện"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    ?.toLowerCase()
                    ?.localeCompare(
                      (optionB!.children as unknown as string).toLowerCase(),
                    )
                }
              >
                {districts?.map((district: IDistrict) => (
                  <Select.Option
                    key={district.districtNo}
                    value={district.districtNo}
                  >
                    {district.districtName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={['street']}
              rules={[
                {
                  required: !disabledStreet,
                  message: 'Hãy nhập vào địa chỉ chi tiết của nhân viên',
                },
              ]}
              style={{ width: '40%' }}
            >
              <Input
                disabled={disabledStreet}
                autoComplete="false"
                size="large"
                placeholder="Nhập vào số nhà, đường"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="clientNo"
          label="Tên công ty:"
          rules={[
            { required: true, message: 'Hãy chọn tên công ty của thành viên' },
          ]}
        >
          <Select
            onSelect={(clientNo: number) => {
              const option = clientList.find(
                item => item.clientNo === clientNo,
              );
              setPolicyList(option?.policies || []);
              form.resetFields(['policyNo']);
            }}
            showSearch
            size="large"
            placeholder="Chọn tên công ty"
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
            {clientList.map(client => {
              return (
                <Select.Option key={client.clientNo} value={client.clientNo}>
                  {client.clientName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          required
          name="policyNo"
          label="Chính sách:"
          rules={[
            {
              required: !_.isEmpty(policyList),
              message: 'Hãy chọn chính sách',
            },
          ]}
        >
          <Select
            disabled={_.isEmpty(policyList)}
            showSearch
            size="large"
            placeholder="Chọn chính sách"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                ?.toLowerCase()
                ?.localeCompare(
                  (optionB!.children as unknown as string).toLowerCase(),
                )
            }
          >
            {policyList?.map((policy: IPolicy) => (
              <Select.Option key={policy.policyNo} value={policy.policyNo}>
                {policy.policyName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào email của nhân viên!',
            },
            {
              type: 'email',
              message: 'Email của nhân viên không hợp lệ!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào email của nhân viên"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Hãy nhập vào số điện thoại của nhân viên!',
            },
          ]}
        >
          <Input
            autoComplete="false"
            size="large"
            placeholder="Nhập vào số điện thoại của nhân viên"
          />
        </Form.Item>

        <Form.Item
          name="timeRange"
          label="Thời gian:"
          rules={[
            {
              type: 'array' as const,
              required: true,
              message: 'Hãy chọn lại thời gian',
            },
          ]}
        >
          <DatePicker.RangePicker
            style={{ width: '60%' }}
            size="large"
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            format={DateFormat.DDMMYYYY}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberForm;
