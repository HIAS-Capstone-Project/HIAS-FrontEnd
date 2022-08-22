import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { chartAge } from 'services/dashboard.service';
import { Row, Col } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Member age chart',
    },
  },
};

interface AgePieChartIF {
  role: string | undefined;
}

const AgePieChart = ({ role }: AgePieChartIF) => {
  const [res, setRes] = useState([]);
  const label: any = [];
  const value: any = [];

  useEffect(() => {
    chartAge().then((response: any) => setRes(response.data.statistics));
  }, []);

  res.forEach((i: any) => {
    label.push(i.key);
    value.push(i.value);
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: '# of Votes',
        data: value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Row>
      <Col>
        <Pie options={options} data={data} />
      </Col>
    </Row>
  );
};

export default AgePieChart;
