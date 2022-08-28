import type { RadioChangeEvent } from 'antd';
import { Card, Col, Radio, Row, Select } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import Loading from 'components/loading';
import {
  selectLayout,
  selectRoles,
  setPermissions,
  setRoles,
  showLoading,
} from 'features/layout/layoutSlice';
import _ from 'lodash';
import { IClient } from 'pages/client/types';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllClientByRole } from 'services/client.service';
import { paymentChart } from 'services/dashboard.service';
import { IFilter } from './types';

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

const years = [
  { value: 2019, name: '2019' },
  { value: 2020, name: '2020' },
  { value: 2021, name: '2021' },
  { value: 2022, name: '2022' },
];

interface PaymentChartIF {
  role: string | undefined;
}

const PaymentChart = ({ role }: PaymentChartIF) => {
  const [res, setRes] = useState([]);
  const [filter, setFilter] = useState<IFilter>({} as IFilter);
  const [clients, setClients] = useState<IClient[]>([]);
  const layout = useAppSelector(selectLayout);
  // const client = useAppSelector(selectClient);
  const dispatch = useAppDispatch();

  const getClientList = async () => {
    dispatch(showLoading(true));
    getAllClientByRole()
      .then(res => {
        if (res) {
          if (_.isEmpty(res)) return;
          setClients(res);
        }
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const getPaymentChartData = async (params: IFilter = {}) => {
    dispatch(showLoading(true));
    paymentChart(params)
      .then(response => {
        if (res) {
          setRes(response.statistics);
          options.plugins.title.text = response.chartName;
          dispatch(setRoles(response?.roles));
        }
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    getPaymentChartData(filter);
  }, [filter]);

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
    <>
      {layout.isloading ? (
        <Loading />
      ) : (
        <Col span={24}>
          <Card style={{ marginBottom: '24px' }}>
            <Row gutter={24}>
              <Col span={4}>
                {/* <ClientNo /> */}
                <Select
                  style={{ width: '100%' }}
                  defaultValue={filter.clientNo}
                  allowClear
                  onChange={(value: number) => {
                    setFilter({ ...filter, clientNo: value });
                  }}
                  showSearch
                  size="large"
                  placeholder="Chọn doanh nghiệp"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      .toLowerCase()
                      .localeCompare(
                        (optionB!.children as unknown as string).toLowerCase(),
                      )
                  }
                >
                  {clients.map(client => {
                    return (
                      <Select.Option
                        key={client.clientNo}
                        value={client.clientNo}
                      >
                        {client.clientName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  style={{ width: '100%' }}
                  defaultValue={filter.year}
                  allowClear
                  onChange={(value: number) => {
                    setFilter({
                      ...filter,
                      year: value,
                      timeFilterBy: 'month',
                    });
                  }}
                  showSearch
                  size="large"
                  placeholder="Chọn năm"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                      .toLowerCase()
                      .localeCompare(
                        (optionB!.children as unknown as string).toLowerCase(),
                      )
                  }
                >
                  {years.map(year => {
                    return (
                      <Select.Option key={year.value} value={year.value}>
                        {year.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={4}>
                {filter.year && (
                  <Radio.Group
                    onChange={(e: RadioChangeEvent) => {
                      setFilter({ ...filter, timeFilterBy: e.target.value });
                    }}
                    style={{ paddingTop: '9px' }}
                    defaultValue={filter.timeFilterBy}
                  >
                    <Radio value={'month'}>Theo tháng</Radio>
                    <Radio value={'quarter'}>Theo quý</Radio>
                  </Radio.Group>
                )}
              </Col>
              <Col span={24}>
                <Bar options={options} data={data} style={{ maxHeight: 500 }} />
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </>
  );
};

export default PaymentChart;
