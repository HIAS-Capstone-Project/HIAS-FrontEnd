import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { businessSector } from 'services/dashboard.service';
import { Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import randomColor from 'randomcolor';
import {
  selectRoles,
  setPermissions,
  setRoles,
} from 'features/layout/layoutSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Business sectors',
    },
  },
};

interface BussinessPieChartIF {
  role: string | undefined;
}

const BussinessSector = ({ role }: BussinessPieChartIF) => {
  const [res, setRes] = useState([]);
  const label: any = [];
  const value: any = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    businessSector().then((response: any) => {
      setRes(response.data.statistics);
      dispatch(setRoles(response.data?.roles));
    });
  }, []);

  res.forEach((i: any) => {
    label.push(i.key);
    value.push(i.value);
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: 'Age',
        data: value,
        backgroundColor: res.map(() => {
          const color = randomColor();
          return color;
        }),
        borderColor: res.map(() => {
          const color = randomColor();
          return color;
        }),
        borderWidth: 1,
      },
    ],
  };

  const roles = useAppSelector(selectRoles);

  if (roles.includes(role)) {
    dispatch(setPermissions(true));
  } else {
    return <></>;
  }

  return (
    <Row style={{ justifyContent: 'center' }}>
      <Col style={{ width: '50%' }}>
        <Pie options={options} data={data} />
      </Col>
    </Row>
  );
};

export default BussinessSector;
