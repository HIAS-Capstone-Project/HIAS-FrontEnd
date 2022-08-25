import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import DateFormat from 'constants/date-format';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { UpdateFormProps, IDistrict } from '../types';
import { IPolicy } from 'pages/policy/types';
import { isVietnamesePhoneNumber } from 'utils';

const EditMemberForm = (props: UpdateFormProps) => {
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
    currentRowData,
    viewMode,
    readonly,
  } = props;

  const { staffID, dob, startDate, endDate, districtNo, address, clientNo } =
    currentRowData;

  const districtList = useMemo(() => {
    const result = [] as IDistrict[];
    return result.concat(
      ...provinces.map(province => province.districtResponseDTOS),
    );
  }, [provinces]);

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

  const initialValues = useMemo(() => {
    const provinceNo = districtList.find(
      item => item.districtNo === districtNo,
    )?.provinceNo;
    const province = provinces.find(item => item.provinceNo === provinceNo);
    setDistricts(province?.districtResponseDTOS || []);
    setPolicyList(
      clientList.find(item => item.clientNo === clientNo)?.policies || [],
    );

    return {
      ...currentRowData,
      dateOfBirth: moment(dob, DateFormat.DDMMYYYY) || undefined,
      timeRange: [
        moment(startDate, DateFormat.YYYYMMDDT),
        moment(endDate, DateFormat.YYYYMMDDT),
      ],
      provinceNo,
      street: address,
    };
  }, [
    address,
    clientList,
    clientNo,
    currentRowData,
    districtList,
    districtNo,
    dob,
    endDate,
    provinces,
    startDate,
  ]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const propsModal = useMemo(() => {
    if (readonly) return { footer: null };
    else return {};
  }, [readonly]);

  return (
    <Modal
      width={800}
      title={viewMode ? 'Thông tin thành viên' : 'Chỉnh sửa thành viên'}
      {...propsModal}
      visible={visible}
      onCancel={() => {
        onCancel();
        setDistricts([]);
      }}
      onOk={onOk}
      confirmLoading={confirmLoading}
      cancelText="Hủy"
      okText="Sửa"
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        disabled={viewMode}
        key={staffID}
      >
        <Form.Item name="staffID" label="Mã thành viên:">
          <Input
            disabled
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

        <Form.Item name="healthCardNo" label="Mã bảo hiểm:">
          <Input disabled autoComplete="false" size="large" />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh:"
            rules={[
              {
                type: 'object' as const,
                required: true,
                message: 'Hãy chọn lại ngày sinh',
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
              required: true,
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
                  form.setFieldsValue({ districtNo: undefined });
                  form.setFieldsValue({ street: undefined });
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
                  required: true,
                  message: 'Hãy nhập vào địa chỉ chi tiết của nhân viên',
                },
              ]}
              style={{ width: '40%' }}
            >
              <Input
                autoComplete="false"
                size="large"
                placeholder="Nhập vào số nhà, đường"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="clientNo"
          label="Tên doanh nghiệp:"
          rules={[
            {
              required: true,
              message: 'Hãy chọn tên doanh nghiệp của thành viên',
            },
          ]}
        >
          <Select
            disabled
            onSelect={(clientNo: number) => {
              const option = clientList.find(
                item => item.clientNo === clientNo,
              );
              setPolicyList(option?.policies || []);
              form.resetFields(['policyNo']);
            }}
            showSearch
            size="large"
            placeholder="Chọn tên doanh nghiệp"
            optionFilterProp="children"
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
              required: true,
              message: 'Hãy chọn chính sách',
            },
          ]}
        >
          <Select
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
              message: 'Hãy nhập vào email của nhân viên',
            },
            {
              type: 'email',
              message: 'Email của nhân viên không hợp lệ',
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

export default EditMemberForm;
