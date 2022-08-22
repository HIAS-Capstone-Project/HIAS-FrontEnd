import { Card, Col, Row } from 'antd';
import GenderBarChart from 'components/chart/GenderBarChart';
import AgePieChart from 'components/chart/AgePieChart';
import './index.css';
import MembersLineChart from 'components/chart/MembersLineChart';
import Color from 'constants/colors';
import NumberCard from 'components/numberCard';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { useAppSelector } from 'app/hooks';
import { selectPermission, selectRoles } from 'features/layout/layoutSlice';

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const isPermission = useAppSelector(selectPermission);

  const numbers = [
    {
      icon: 'pay-circle-o',
      color: Color.green,
      title: 'Online Review',
      number: 2781,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'New Customers',
      number: 3241,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Active Projects',
      number: 253,
    },
    {
      icon: 'shopping-cart',
      color: Color.red,
      title: 'Referrals',
      number: 4324,
    },
  ];

  const numberCards = numbers.map((item, key) => (
    <Col key={key} lg={6} md={12}>
      <NumberCard {...item} />
    </Col>
  ));

  return (
    <div className="app-container">
      <Row gutter={24}>{numberCards}</Row>
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={24}>
          <Col span={24}>{<MembersLineChart role={user?.role} />}</Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: '24px' }}>
        <Row>
          <Col span={12}>
            {isPermission && <AgePieChart role={user?.role} />}
          </Col>
          <Col span={12}>
            {isPermission && <GenderBarChart role={user?.role} />}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
