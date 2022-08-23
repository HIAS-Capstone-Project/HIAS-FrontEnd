import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';
const color = randomColor();
import { chartOnboardYear } from 'services/dashboard.service';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectRoles,
  setPermissions,
  setRoles,
} from 'features/layout/layoutSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'All members',
    },
  },
};

interface MembersLineChartIF {
  role: string | undefined;
}

const MembersLineChart = ({ role }: MembersLineChartIF) => {
  const [res, setRes] = useState<any>([]);
  const labels: any = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    chartOnboardYear().then((response: any) => {
      setRes(response.data.lines);
      dispatch(setRoles(response.data?.roles));
    });
  }, []);

  const roles = useAppSelector(selectRoles);

  if (roles.includes(role)) {
    dispatch(setPermissions(true));
  } else {
    return <></>;
  }

  const dataCharts = res.map((e: any, i: number) => {
    e.statistics.forEach((statistic: any) => labels.push(statistic.key));
    return {
      label: e.chartName,
      data: e.statistics.map((value: any) => value.value),
      borderColor: color,
      backgroundColor: color,
    };
  });

  const data = {
    labels,
    datasets: dataCharts,
  };
  return <Line options={options} data={data} style={{ maxHeight: 500 }} />;
};

export default MembersLineChart;
