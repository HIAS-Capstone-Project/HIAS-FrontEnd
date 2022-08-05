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
import DateFormat from 'constants/date-format';
import { QueryParams } from 'pages/service-provider/types';
import { MouseEvent, useEffect, useState } from 'react';
import {
  deleteServiceProvider,
  getServiceProviders,
  saveServiceProvider,
} from 'services/service.provider.service';
import { NOT_ACCEPTABLE } from './../../constants';
import AddServiceProviderForm from './form/add-service-provider-form';
import EditServiceProviderForm from './form/edit-service-provider';
import { IServiceProvider } from './types';
const { Column } = Table;

interface ServiceProviderPageState {
  serviceProviderList: IServiceProvider[];
  editServiceProviderModalVisible: boolean;
  editServiceProviderModalLoading: boolean;
  currentRowData: IServiceProvider;
  addServiceProviderModalVisible: boolean;
  addServiceProviderModalLoading: boolean;
  viewMode: boolean;
}

const ServiceProviderPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    serviceProviderList: [] as IServiceProvider[],
    editServiceProviderModalVisible: false,
    editServiceProviderModalLoading: false,
    currentRowData: {} as IServiceProvider,
    addServiceProviderModalVisible: false,
    addServiceProviderModalLoading: false,
    viewMode: false,
  };

  const [serviceProviderPageState, setServiceProviderPageState] =
    useState<ServiceProviderPageState>(initialState);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    // hideOnSinglePage: true,
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
    serviceProviderList,
    editServiceProviderModalVisible,
    editServiceProviderModalLoading,
    currentRowData,
    addServiceProviderModalVisible,
    addServiceProviderModalLoading,
    viewMode,
  } = serviceProviderPageState;

  const getServiceProviderList = async (params: QueryParams = {}) => {
    getServiceProviders(params).then(res => {
      if (res) {
        setServiceProviderPageState({
          serviceProviderList: res.listItems,
          currentRowData: {} as IServiceProvider,
          addServiceProviderModalVisible: false,
          addServiceProviderModalLoading: false,
          editServiceProviderModalLoading: false,
          editServiceProviderModalVisible: false,
          viewMode: false,
        });
        setPagination({
          ...pagination,
          total: res.totalItems,
          current: res.pageIndex,
          pageSize: params.pagination?.pageSize,
          showTotal: (total, range) => {
            if (params.pagination?.pageSize === 1 || res.listItems.length === 1)
              return `${range[0]} trong ${total} CSKCB`;
            return `${range[0]}-${range[1]} trong ${total} CSKCB`;
          },
        });
      }
    });
  };
  useEffect(() => {
    getServiceProviderList({ pagination });
  }, []);

  const handleAddServiceProvider = () => {
    setServiceProviderPageState({
      ...serviceProviderPageState,
      addServiceProviderModalVisible: true,
    });
  };

  const handleAddServiceProviderOK = () => {
    setServiceProviderPageState({
      ...serviceProviderPageState,
      addServiceProviderModalLoading: true,
    });
    formAdd
      .validateFields()
      .then(() => {
        const fieldValue = formAdd.getFieldsValue();

        const value = {
          ...fieldValue,
          startDate: fieldValue.timeRange[0]
            .format(DateFormat.DDMMYYYY)
            .concat(' 00:00:00'),
          endDate: fieldValue.timeRange[1]
            .format(DateFormat.DDMMYYYY)
            .concat(' 00:00:00'),
        };
        delete value.timeRange;

        saveServiceProvider(value)
          .then(res => {
            formAdd.resetFields();
            getServiceProviderList({ pagination });
          })
          .catch(e => {
            const { httpStatus, fieldName, errorMessage } = e.response.data;
            if (httpStatus === NOT_ACCEPTABLE) {
              formAdd.setFields([{ name: fieldName, errors: [errorMessage] }]);
            }
          });
      })
      /** @TO_DO catch error after validate FE */
      .catch(() => {})
      .finally(() => {
        setServiceProviderPageState({
          ...serviceProviderPageState,
          addServiceProviderModalLoading: false,
        });
      });
  };

  const handleEditServiceProvider = (row: IServiceProvider) => {
    setServiceProviderPageState({
      ...serviceProviderPageState,
      editServiceProviderModalVisible: true,
      currentRowData: row,
      viewMode: false,
    });
  };

  const handleEditServiceProviderOK = () => {
    if (viewMode) {
      setServiceProviderPageState({
        ...serviceProviderPageState,
        viewMode: false,
      });
      return;
    }
    setServiceProviderPageState({
      ...serviceProviderPageState,
      editServiceProviderModalLoading: true,
    });
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();

      const value = {
        ...fieldValue,
        serviceProviderNo: currentRowData.serviceProviderNo,
        startDate: fieldValue.timeRange[0]
          .format(DateFormat.DDMMYYYY)
          .concat(' 00:00:00'),
        endDate: fieldValue.timeRange[1]
          .format(DateFormat.DDMMYYYY)
          .concat(' 00:00:00'),
      };
      delete value.timeRange;
      formEdit.resetFields();
      saveServiceProvider(value).then(res => {
        getServiceProviderList({ pagination });
      });
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getServiceProviderList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getServiceProviderList({ pagination, key: value });
  };

  const handleDeleteServiceProvider = async (serviceProviderNo: number) => {
    await deleteServiceProvider(serviceProviderNo);
    getServiceProviderList({ pagination });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddServiceProvider}>
          Thêm Cơ Sở Khám Chữa Bệnh
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
    setServiceProviderPageState({
      ...serviceProviderPageState,
      editServiceProviderModalVisible: false,
      addServiceProviderModalVisible: false,
      currentRowData: {} as IServiceProvider,
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
                setServiceProviderPageState({
                  ...serviceProviderPageState,
                  editServiceProviderModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="serviceProviderNo"
          dataSource={serviceProviderList}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã CSKCB"
            dataIndex="serviceProviderID"
            key="serviceProviderID"
            align="center"
          />
          <Column
            title="Tên CSKCB"
            dataIndex="serviceProviderName"
            key="serviceProviderName"
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
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IServiceProvider) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditServiceProvider(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleDeleteServiceProvider(row.serviceProviderNo);
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditServiceProviderForm
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editServiceProviderModalVisible}
        confirmLoading={editServiceProviderModalLoading}
        onCancel={handleCancel}
        onOk={handleEditServiceProviderOK}
      />

      <AddServiceProviderForm
        form={formAdd}
        visible={addServiceProviderModalVisible}
        confirmLoading={addServiceProviderModalLoading}
        onCancel={handleCancel}
        onOk={handleAddServiceProviderOK}
      />
    </div>
  );
};

export default ServiceProviderPage;
