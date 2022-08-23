import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
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
import ConfirmDialog from 'components/confirm-dialog';
import { openNotificationWithIcon } from 'components/notification';
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
import dashboardLinks from '../../pages/links';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/authentication/authenticationSlice';
import { useLocation } from 'react-router';

interface ServiceProviderPageState {
  serviceProviderList: IServiceProvider[];
  editServiceProviderModalVisible: boolean;
  editServiceProviderModalLoading: boolean;
  currentRowData: IServiceProvider;
  addServiceProviderModalVisible: boolean;
  addServiceProviderModalLoading: boolean;
  viewMode: boolean;
  deleteModelVisible: boolean;
}

const ServiceProviderPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  const readonly = dashboardLinks[user.role].find((x: any) => {
    return x.to == location.pathname;
  }).readonly;

  const initialState = {
    serviceProviderList: [] as IServiceProvider[],
    editServiceProviderModalVisible: false,
    editServiceProviderModalLoading: false,
    currentRowData: {} as IServiceProvider,
    addServiceProviderModalVisible: false,
    addServiceProviderModalLoading: false,
    viewMode: false,
    deleteModelVisible: false,
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
    deleteModelVisible,
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
          deleteModelVisible: false,
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
    formAdd.validateFields().then(() => {
      setServiceProviderPageState({
        ...serviceProviderPageState,
        addServiceProviderModalLoading: true,
      });
      const fieldValue = formAdd.getFieldsValue();
      fieldValue.serviceProviderID = fieldValue.serviceProviderID.trim();
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
          openNotificationWithIcon(
            'success',
            'Thêm cơ sở khám chữa bệnh thành công',
            `Cơ sở khám chữa bệnh có mã ${value.serviceProviderID} đã được thêm mới`,
            'bottomLeft',
          );
          getServiceProviderList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([
              {
                name: fieldName,
                errors: [errorMessage],
                value: formAdd.getFieldValue(fieldName).trim(),
              },
            ]);
          }
          setServiceProviderPageState({
            ...serviceProviderPageState,
            addServiceProviderModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
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
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();
      setServiceProviderPageState({
        ...serviceProviderPageState,
        editServiceProviderModalLoading: true,
        currentRowData: fieldValue,
      });
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
        openNotificationWithIcon(
          'success',
          'Chỉnh sửa cơ sở khám chữa bệnh thành công',
          `Cơ sở khám chữa bệnh có mã ${currentRowData.serviceProviderID} đã được cập nhật`,
          'bottomLeft',
        );
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

  const handleDeleteServiceProvider = async (
    serviceProviderNo: number,
    serviceProviderID: string,
  ) => {
    await deleteServiceProvider(serviceProviderNo).then(() => {
      openNotificationWithIcon(
        'error',
        'Xóa cơ sở khám chữa bệnh thành công',
        `Cơ sở khám chữa bệnh có mã ${serviceProviderID} đã được xóa`,
        'bottomLeft',
      );
      getServiceProviderList({ pagination });
    });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        {!readonly && (
          <Button
            size="large"
            type="primary"
            onClick={handleAddServiceProvider}
          >
            Thêm Cơ sở khám chữa bệnh
          </Button>
        )}
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
          {!readonly && (
            <Column
              title="Thao tác"
              key="action"
              align="center"
              render={(text, row: IServiceProvider) => (
                <span>
                  <EditTwoTone
                    style={{ fontSize: '200%' }}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      handleEditServiceProvider(row);
                    }}
                  />
                  <Divider type="vertical" style={{ fontSize: '200%' }} />
                  <DeleteOutlined
                    style={{ fontSize: '200%', color: '#ff4d4f' }}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setServiceProviderPageState({
                        ...serviceProviderPageState,
                        currentRowData: row,
                        deleteModelVisible: true,
                      });
                    }}
                  />
                </span>
              )}
            />
          )}
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
      <ConfirmDialog
        visible={deleteModelVisible}
        title="Xóa cơ sở khám chữa bệnh"
        content={`Bạn có đồng ý xóa cơ sở khám chữa bệnh ${currentRowData.serviceProviderName} hay không?`}
        onOK={() =>
          handleDeleteServiceProvider(
            currentRowData.serviceProviderNo,
            currentRowData.serviceProviderID,
          )
        }
        onCancel={() =>
          setServiceProviderPageState({
            ...serviceProviderPageState,
            currentRowData: {} as IServiceProvider,
            deleteModelVisible: false,
          })
        }
      />
    </div>
  );
};

export default ServiceProviderPage;
