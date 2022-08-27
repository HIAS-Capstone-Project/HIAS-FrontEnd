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
import { chartGender } from 'services/dashboard.service';

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
      text: 'Member gender chart',
    },
  },
};

interface GenderBarChartIF {
  role: string | undefined;
}

const GenderBarChart = ({ role }: GenderBarChartIF) => {
  const [res, setRes] = useState([]);
  const label: any = [];
  const value: any = [];

  useEffect(() => {
    chartGender().then((response: any) => {
      setRes(response.data.statistics);
      options.plugins.title.text = response.data.chartName;
    });
  }, []);

  res.forEach((i: any) => {
    label.push(i.key);
    value.push(i.value);
  });

  const data = {
    labels: ['Gender'],
    datasets: [
      {
        label: 'Male',
        data: [value[0]],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Female',
        data: [value[1]],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default GenderBarChart;
