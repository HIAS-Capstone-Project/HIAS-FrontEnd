import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Space,
  Table,
  TablePaginationConfig,
} from 'antd';
import { MouseEvent, useEffect, useState } from 'react';
import {
  addClient,
  deleteClient,
  getClients,
  updateClient,
} from 'services/client.service';
import AddClientForm from './forms/add-client-form';
import EditClientForm from './forms/edit-client-form';
import { IClient, QueryParams } from './types';
import { NOT_ACCEPTABLE } from './../../constants';
const { Column } = Table;

interface ClientPageState {
  clientList: IClient[];
  editClientModalVisible: boolean;
  editClientModalLoading: boolean;
  currentRowData: IClient;
  addClientModalVisible: boolean;
  addClientModalLoading: boolean;
  viewMode: boolean;
}

const ClientPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    clientList: [] as IClient[],
    editClientModalVisible: false,
    editClientModalLoading: false,
    currentRowData: {} as IClient,
    addClientModalVisible: false,
    addClientModalLoading: false,
    viewMode: false,
  };

  const [clientPageState, setClientPageState] =
    useState<ClientPageState>(initialState);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    showLessItems: true,
    current: 1,
    pageSize: 5,
    position: ['bottomCenter'],
    pageSizeOptions: [5, 10, 20],
    onShowSizeChange(current, size) {
      setPagination({ ...pagination, pageSize: size, current: 1 });
    },
  });

  const [key, setKey] = useState<string>('');

  const {
    clientList,
    addClientModalVisible,
    addClientModalLoading,
    currentRowData,
    editClientModalVisible,
    editClientModalLoading,
    viewMode,
  } = clientPageState;

  const getClientList = async (params: QueryParams = {}) => {
    getClients(params).then(res => {
      if (res) {
        setClientPageState({
          clientList: res.rows,
          currentRowData: {} as IClient,
          addClientModalVisible: false,
          addClientModalLoading: false,
          editClientModalLoading: false,
          editClientModalVisible: false,
          viewMode: false,
        });
        setPagination({
          ...pagination,
          total: res.totalElements,
          current: res.pageNumber + 1,
          pageSize: params.pagination?.pageSize,
          showTotal: (total, range) => {
            if (params.pagination?.pageSize === 1 || res.rows.length === 1)
              return `${range[0]} trong ${total}`;
            return `${range[0]}-${range[1]} trong ${total}`;
          },
        });
      }
    });
  };
  useEffect(() => {
    getClientList({ pagination });
  }, []);

  const handleAddClient = () => {
    setClientPageState({ ...clientPageState, addClientModalVisible: true });
  };

  const handleAddClientOK = () => {
    setClientPageState({ ...clientPageState, addClientModalLoading: true });
    formAdd
      .validateFields()
      .then(() => {
        const fieldValue = formAdd.getFieldsValue();

        addClient(fieldValue)
          .then(res => {
            formAdd.resetFields();
            getClientList({ pagination });
          })
          .catch(e => {
            const { httpStatus, fieldName, errorMessage } = e.response.data;
            if (httpStatus === NOT_ACCEPTABLE) {
              formAdd.setFields([{ name: fieldName, errors: [errorMessage] }]);
            }
            setClientPageState({
              ...clientPageState,
              addClientModalLoading: false,
            });
          });
      })
      /** @TO_DO catch error after validate FE */
      .finally(() => {
        setClientPageState({
          ...clientPageState,
          addClientModalLoading: false,
        });
      });
  };

  const handleEditClient = (row: IClient) => {
    setClientPageState({
      ...clientPageState,
      editClientModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditClientOK = () => {
    if (viewMode) {
      setClientPageState({
        ...clientPageState,
        viewMode: false,
      });
      return;
    }
    setClientPageState({
      ...clientPageState,
      editClientModalLoading: true,
    });
    formEdit
      .validateFields()
      .then(() => {
        const fieldValue = formEdit.getFieldsValue();

        const value = {
          ...fieldValue,
          clientNo: currentRowData.clientNo,
        };

        formEdit.resetFields();
        updateClient(value).then(res => {
          getClientList({ pagination });
        });
      })
      .finally(() => {
        setClientPageState({
          ...clientPageState,
          editClientModalLoading: false,
        });
      });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getClientList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getClientList({ pagination, key: value });
  };

  const handleDeleteClient = async (clientNo: number) => {
    await deleteClient(clientNo);
    getClientList({ pagination });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddClient}>
          Thêm Doanh Nghiệp
        </Button>
      </span>
      <Input.Search
        placeholder="Nhập vào giá trị muốn tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );

  const handleCancel = () => {
    formAdd.resetFields();
    formEdit.resetFields();
    setClientPageState({
      ...clientPageState,
      addClientModalVisible: false,
      editClientModalVisible: false,
      currentRowData: {} as IClient,
      viewMode: false,
    });
  };

  return (
    <div className="app-container">
      <Card title={title}>
        <Table
          rowClassName="app-row"
          onRow={record => {
            return {
              onClick: () => {
                setClientPageState({
                  ...clientPageState,
                  editClientModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="clientNo"
          dataSource={clientList}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã doanh nghiệp"
            dataIndex="corporateID"
            key="corporateID"
            align="center"
          />
          <Column
            title="Tên doanh nghiệp"
            dataIndex="clientName"
            key="clientName"
            align="center"
          />
          <Column
            title="Địa chỉ"
            dataIndex="address"
            key="address"
            align="center"
          />
          <Column title="Email" dataIndex="email" key="email" align="center" />
          <Column
            title="Số điện thoại"
            dataIndex="phoneNumber"
            key="phoneNumber"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IClient) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditClient(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleDeleteClient(row.clientNo);
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditClientForm
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editClientModalVisible}
        confirmLoading={editClientModalLoading}
        onCancel={handleCancel}
        onOk={handleEditClientOK}
      />
      <AddClientForm
        form={formAdd}
        visible={addClientModalVisible}
        confirmLoading={addClientModalLoading}
        onCancel={handleCancel}
        onOk={handleAddClientOK}
      />
    </div>
  );
};

export default ClientPage;
