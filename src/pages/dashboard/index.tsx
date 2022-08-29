import { Card, Col, Row } from 'antd';
import { useAppSelector } from 'app/hooks';
import AgePieChart from 'components/chart/AgePieChart';
import BussinessSector from 'components/chart/BusinessSectorChart';
import ClaimByAllStatus from 'components/chart/ClaimByAllStatus';
import ClaimBySpecialStatus from 'components/chart/ClaimBySpecialStatus';
import GenderBarChart from 'components/chart/GenderBarChart';
import LocationChart from 'components/chart/LocationChart';
import MembersLineChart from 'components/chart/MembersLineChart';
import PaymentChart from 'components/chart/PaymentChart';
import NumberCard from 'components/numberCard';
import Color from 'constants/colors';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { useEffect, useState } from 'react';
import { findAll } from 'services/dashboard.service';
import './index.css';

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const [number, setNumber] = useState<any>([]);

  useEffect(() => {
    findAll()
      .then((res: any) => {
        setNumber(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const numbers = [
    {
      icon: 'pay-circle-o',
      color: Color.green,
      title: 'Người tham gia bảo hiểm',
      number: number[2]?.value,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'Yêu cầu bồi thường',
      number: number[1]?.value,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Chính sách',
      number: number[3]?.value,
    },
    {
      icon: 'shopping-cart',
      color: Color.red,
      title: 'Ngành nghề',
      number: number[0]?.value,
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
      <PaymentChart role={user?.role} />
      <MembersLineChart role={user?.role} />
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={24}>
          <Col span={12}>{<AgePieChart role={user?.role} />}</Col>
          <Col span={12}>{<GenderBarChart role={user?.role} />}</Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={24}>
          <Col span={12}>{<BussinessSector role={user?.role} />}</Col>
          <Col span={12}>{<LocationChart role={user?.role} />}</Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={24}>
          <Col span={12}>{<ClaimByAllStatus role={user?.role} />}</Col>
          <Col span={12}>{<ClaimBySpecialStatus role={user?.role} />}</Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
