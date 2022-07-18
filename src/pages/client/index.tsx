import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Card, Divider, Form, Table } from 'antd';
import { AppDispatch } from 'app/store';
import { IClientResponse } from 'models';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient, getAll } from 'services/client.service';
import AddClientForm from './forms/add-client-form';
import EditClientForm from './forms/edit-client-form';
const { Column } = Table;

interface ClientPageState {
  clients: IClientResponse[];
  editClientModalVisible: boolean;
  editClientModalLoading: boolean;
  currentRowData: IClientResponse;
  addClientModalVisible: boolean;
  addClientModalLoading: boolean;
}

const ClientPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const initialState = {
    clients: [] as IClientResponse[],
    editClientModalVisible: false,
    editClientModalLoading: false,
    currentRowData: {} as IClientResponse,
    addClientModalVisible: false,
    addClientModalLoading: false,
  };

  const [clientPageState, setClientPageState] =
    useState<ClientPageState>(initialState);

  const {
    clients,
    addClientModalVisible,
    addClientModalLoading,
    currentRowData,
    editClientModalVisible,
    editClientModalLoading,
  } = clientPageState;

  const getClients = async () => {
    getAll().then(res => {
      if (res) {
        setClientPageState({ ...clientPageState, clients: res });
      }
    });
  };
  useEffect(() => {
    // dispatch(getAllClients());
    getClients();
  }, [dispatch]);

  const handleAddClient = () => {
    setClientPageState({ ...clientPageState, addClientModalVisible: true });
  };

  const handleAddClientOK = () => {
    setClientPageState({ ...clientPageState, addClientModalLoading: true });
    form.validateFields().then(value => {
      addClient(value)
        .then(res => {
          form.resetFields();
          setClientPageState({
            ...clientPageState,
            addClientModalVisible: false,
            addClientModalLoading: false,
          });
          // load client again
          getClients();
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const handleEditClient = (row: IClientResponse) => {
    setClientPageState({
      ...clientPageState,
      editClientModalVisible: true,
      currentRowData: row,
    });
  };

  const title = (
    <span>
      <Button size="large" type="primary" onClick={handleAddClient}>
        Add client
      </Button>
    </span>
  );

  const handleCancel = () => {
    setClientPageState({
      ...clientPageState,
      addClientModalVisible: false,
      editClientModalVisible: false,
    });
  };

  return (
    <div className="app-container">
      <Card title={title}>
        <Table bordered rowKey="id" dataSource={clients} pagination={false}>
          <Column
            title="Mã công ty"
            dataIndex="corporateID"
            key="corporateID"
            align="center"
          />
          <Column
            title="Tên công ty"
            dataIndex="name"
            key="name"
            align="center"
          />
          <Column
            title="Địa chỉ"
            dataIndex="address"
            key="address"
            align="center"
          />
          <Column
            title="Số điện thoại"
            dataIndex="phoneNumber"
            key="phoneNumber"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            // width={195}
            align="center"
            render={(text, row: IClientResponse) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={() => handleEditClient(row)}
                />
                {/* <Button
                  type="primary"
                  shape="circle"
                  icon="edit"
                  title="编辑"
                  // onClick={this.handleEditUser.bind(null, row)}
                /> */}
                <Divider type="vertical" />
                <DeleteTwoTone style={{ fontSize: '150%' }} />
                {/* <Button
                  type="primary"
                  shape="circle"
                  icon="delete"
                  title="删除"
                  // onClick={this.handleDeleteUser.bind(null, row)}
                /> */}
              </span>
            )}
          />
        </Table>
      </Card>
      <EditClientForm
        currentRowData={currentRowData}
        form={form}
        visible={editClientModalVisible}
        confirmLoading={editClientModalLoading}
        onCancel={handleCancel}
        onOk={handleAddClientOK}
      />
      <AddClientForm
        form={form}
        visible={addClientModalVisible}
        confirmLoading={addClientModalLoading}
        onCancel={handleCancel}
        onOk={handleAddClientOK}
      />
    </div>
  );
};

export default ClientPage;
