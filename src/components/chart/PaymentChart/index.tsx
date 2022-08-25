import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartGender, paymentChart } from 'services/dashboard.service';
import randomColor from 'randomcolor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectClient,
  selectRoles,
  setPermissions,
} from 'features/layout/layoutSlice';
import { Card, Col, Row } from 'antd';
import ClientNo from 'components/clientNo';
const color = randomColor();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Payment statistics',
    },
  },
};

interface PaymentChartIF {
  role: string | undefined;
}

const PaymentChart = ({ role }: PaymentChartIF) => {
  const [res, setRes] = useState([]);
  const client = useAppSelector(selectClient);
  const dispatch = useAppDispatch();

  useEffect(() => {
    paymentChart(client).then((response: any) =>
      setRes(response.data.statistics),
    );
  }, [client]);

  const roles = useAppSelector(selectRoles);

  if (roles.includes(role)) {
    dispatch(setPermissions(true));
  } else {
    return <></>;
  }

  const mappingData = res.map((e: any) => {
    return {
      label: e?.key,
      data: [e?.value],
      backgroundColor: res.map(() => {
        const color = randomColor();
        return color;
      }),
    };
  });

  const data = {
    labels: ['Payment'],
    datasets: mappingData,
  };
  return (
    <Card style={{ marginBottom: '24px' }}>
      <Row gutter={24}>
        <Col span={5}>
          <ClientNo />
        </Col>
        <Col span={24}>
          <Bar options={options} data={data} style={{ maxHeight: 500 }} />
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentChart;
