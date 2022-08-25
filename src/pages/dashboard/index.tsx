import { Card, Col, Row } from 'antd';
import GenderBarChart from 'components/chart/GenderBarChart';
import AgePieChart from 'components/chart/AgePieChart';
import './index.css';
import MembersLineChart from 'components/chart/MembersLineChart';
import Color from 'constants/colors';
import NumberCard from 'components/numberCard';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { useAppSelector } from 'app/hooks';
import BussinessSector from 'components/chart/BusinessSectorChart';
import LocationChart from 'components/chart/LocationChart';
import ClaimByAllStatus from 'components/chart/ClaimByAllStatus';
import ClaimBySpecialStatus from 'components/chart/ClaimBySpecialStatus';
import { useEffect, useState } from 'react';
import { findAll } from 'services/dashboard.service';
import PaymentChart from 'components/chart/PaymentChart';
import ClientNo from 'components/clientNo';

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
      title: 'Member',
      number: number[2]?.value,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'Claim',
      number: number[1]?.value,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Policy',
      number: number[3]?.value,
    },
    {
      icon: 'shopping-cart',
      color: Color.red,
      title: 'Business Sectors',
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
      <Col span={24}>{<PaymentChart role={user?.role} />}</Col>
      <Col span={24}>{<MembersLineChart role={user?.role} />}</Col>
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
