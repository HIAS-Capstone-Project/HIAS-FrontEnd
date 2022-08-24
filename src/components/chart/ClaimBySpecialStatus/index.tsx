import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { claimBySpecialStatusChart } from 'services/dashboard.service';
import { Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectRoles,
  setPermissions,
  setRoles,
} from 'features/layout/layoutSlice';
import randomColor from 'randomcolor';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Claim with status: Settle, Legal Reject, Violation',
    },
  },
};
interface LocationChartIF {
  role: string | undefined;
}

const ClaimBySpecialStatus = ({ role }: LocationChartIF) => {
  const [res, setRes] = useState([]);
  const label: any = [];
  const value: any = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    claimBySpecialStatusChart().then((response: any) => {
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
        label: '# of Votes',
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

export default ClaimBySpecialStatus;
