import React, { useEffect } from 'react';
import { Select } from 'antd';
import { getAllClient } from 'services/client.service';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectClients,
  setClient,
  setClients,
} from 'features/layout/layoutSlice';

const { Option } = Select;

const ClientNo: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllClient().then(response => {
      dispatch(setClients(response));
    });
  }, [dispatch]);

  const handleChange = (value: string) => {
    dispatch(setClient(value));
  };

  const clients = useAppSelector(selectClients);
  return (
    <>
      <span>Client number: </span>
      <Select
        placeholder="Select number no"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {clients.map((client: any) => (
          <Option
            key={client?.clientNo}
            value={client?.clientNo}
            label={client?.clientNo}
          >
            <div className="demo-option-label-item">{client?.clientNo}</div>
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ClientNo;
