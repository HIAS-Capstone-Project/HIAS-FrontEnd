import { Card, Col, FormInstance, Row, Space, Typography } from 'antd';
import { useAppSelector } from 'app/hooks';
import DateFormat from 'constants/date-format';
import { selectUserInfo } from 'features/authentication/authenticationSlice';
import _ from 'lodash';
import { IBenefitDTOS } from 'models/benefit/types';
import { IMember } from 'pages/member/types';

const { Title } = Typography;

interface ISummaryProps {
  form: FormInstance;
  benefits: IBenefitDTOS[];
}

const Summary = (props: ISummaryProps) => {
  const { benefits, form } = props;
  const info = useAppSelector(selectUserInfo) as IMember;
  return (
    <Space>
      <Card style={{ minHeight: '70vh' }} bordered={false}>
        <Title level={2}>
          Tóm tắt thông tin yêu cầu giải quyết quyền lợi bảo hiểm
        </Title>
        <Space
          direction="vertical"
          style={{
            minWidth: '960px',
            paddingLeft: '20px',
            marginTop: '1.2rem',
          }}
        >
          <div className="site-card-wrapper">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row gutter={20}>
                <Col span={8}>
                  <Card title="Tên thành viên">{info.memberName}</Card>
                </Col>
                <Col span={8}>
                  <Card title="Quyền lợi bảo hiểm">
                    {
                      benefits.find(
                        item =>
                          item.benefitNo === form.getFieldValue('benefitNo'),
                      )?.benefitName
                    }
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Tên bệnh viện">
                    {form.getFieldValue('medicalAddress')}
                  </Card>
                </Col>
              </Row>
              <Row gutter={20}>
                {!_.isEmpty(form.getFieldValue('description')) && (
                  <Col span={8}>
                    <Card title="Chuẩn đoán bệnh">
                      {form.getFieldValue('description')}
                    </Card>
                  </Col>
                )}
                <Col span={8}>
                  <Card title="Ngày khám bệnh">
                    {form
                      .getFieldValue('visitDate')
                      .format(DateFormat.DDMMYYYY)}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Chi phí yêu cầu bồi thường:">
                    {`${form
                      .getFieldValue('claimAmount')
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ`}
                  </Card>
                </Col>
              </Row>
            </Space>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default Summary;
