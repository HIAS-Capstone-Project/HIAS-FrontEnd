import {
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
} from 'antd';
import DateFormat from 'constants/date-format';
import { IBenefitDTOS } from 'models/benefit/types';
import moment from 'moment';

const { Title } = Typography;

interface IBenefitClaimProps {
  benefits: IBenefitDTOS[];
}

const BenefitClaim = (props: IBenefitClaimProps) => {
  const { benefits } = props;
  return (
    <Space>
      <Card style={{ minHeight: '70vh' }} bordered={false}>
        <Title level={2}>Chi tiết điều trị</Title>
        <Space
          direction="vertical"
          style={{
            minWidth: '960px',
            paddingLeft: '20px',
            marginTop: '1.2rem',
          }}
        >
          <Form.Item
            name="benefitNo"
            label="Tên quyền lợi:"
            rules={[{ required: true, message: 'Hãy chọn tên quyền lợi' }]}
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
            name="medicalAddress"
            label="Tên bệnh viện:"
            rules={[{ required: true, message: 'Hãy nhập vào tên bệnh viện' }]}
          >
            <Input
              autoComplete="false"
              size="large"
              placeholder="Nhập vào tên bệnh viện "
            />
          </Form.Item>

          <Form.Item name="description" label="Chuẩn đoán bệnh:">
            <Input.TextArea
              autoComplete="false"
              size="large"
              placeholder="Nhập vào bệnh được bác sĩ chuẩn đoán"
            />
          </Form.Item>

          <Form.Item
            name="visitDate"
            label="Ngày khám bệnh:"
            rules={[
              {
                type: 'object' as const,
                required: true,
                message: 'Hãy chọn lại ngày khám bệnh!',
              },
            ]}
          >
            <DatePicker
              style={{ width: '50%' }}
              disabledDate={current => current.isAfter(moment())}
              placeholder="Ngày khám bệnh"
              size="large"
              format={DateFormat.DDMMYYYY}
            />
          </Form.Item>

          <Form.Item name="timeRange" label="Thời gian điều trị:">
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              size="large"
              placeholder={['Từ ngày', 'Đến ngày']}
              format={DateFormat.DDMMYYYY}
            />
          </Form.Item>

          <Form.Item
            name="claimAmount"
            label="Chi phí đã chi trả"
            rules={[
              {
                required: true,
                message: 'Hãy nhập vào chi phí đã chi trả',
              },
            ]}
          >
            <InputNumber<number>
              controls={false}
              style={{ width: '100%' }}
              min={0}
              autoComplete="false"
              size="large"
              placeholder="Nhập vào chi phí đã chi trả"
            />
          </Form.Item>
        </Space>
      </Card>
    </Space>
  );
};

export default BenefitClaim;
