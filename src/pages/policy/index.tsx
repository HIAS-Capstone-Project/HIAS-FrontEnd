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
import Column from 'antd/lib/table/Column';
import _ from 'lodash';
import { IClient } from 'pages/client/types';
import { MouseEvent, useEffect, useState } from 'react';
import { getClients } from 'services/client.service';
import {
  addPolicy,
  deletePolicy,
  getPolicies,
  updatePolicy,
} from 'services/policy.service';
import { NOT_ACCEPTABLE } from './../../constants/http-status';
import AddPolicyForm from './form/add-policy-form';
import EditPolicyForm from './form/edit-policy-form';
import { IPolicy, QueryParams } from './types';

interface IPolicyPageState {
  policyList: IPolicy[];
  editPolicyModalVisible: boolean;
  editPolicyModalLoading: boolean;
  currentRowData: IPolicy;
  addPolicyModalVisible: boolean;
  addPolicyModalLoading: boolean;
  viewMode: boolean;
}

const PolicyPage = () => {
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const initialState = {
    policyList: [] as IPolicy[],
    editPolicyModalVisible: false,
    editPolicyModalLoading: false,
    currentRowData: {} as IPolicy,
    addPolicyModalVisible: false,
    addPolicyModalLoading: false,
    viewMode: false,
  };

  const [policyPageState, setPolicyPageState] =
    useState<IPolicyPageState>(initialState);

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
  const [clients, setClients] = useState<IClient[]>([]);

  const {
    policyList,
    addPolicyModalVisible,
    addPolicyModalLoading,
    currentRowData,
    editPolicyModalVisible,
    editPolicyModalLoading,
    viewMode,
  } = policyPageState;

  const getPolicyList = async (params: QueryParams = {}) => {
    getPolicies(params).then(res => {
      if (res) {
        setPolicyPageState({
          policyList: res.rows,
          currentRowData: {} as IPolicy,
          addPolicyModalVisible: false,
          addPolicyModalLoading: false,
          editPolicyModalLoading: false,
          editPolicyModalVisible: false,
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

  const getClientList = async (params: QueryParams = {}) => {
    getClients(params).then(res => {
      if (res) {
        if (_.isEmpty(res.rows)) return;
        setClients(res.rows);
      }
    });
  };
  useEffect(() => {
    getPolicyList({ pagination });
    getClientList();
  }, []);

  const handleAddPolicy = () => {
    setPolicyPageState({ ...policyPageState, addPolicyModalVisible: true });
  };

  const handleAddPolicyOK = async () => {
    setPolicyPageState({ ...policyPageState, addPolicyModalLoading: true });
    formAdd.validateFields().then(() => {
      const fieldValue = formAdd.getFieldsValue();

      addPolicy(fieldValue)
        .then(res => {
          formAdd.resetFields();
          getPolicyList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([{ name: fieldName, errors: [errorMessage] }]);
          }
          setPolicyPageState({
            ...policyPageState,
            addPolicyModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
    // .catch(() => {});
  };

  const handleEditPolicy = (row: IPolicy) => {
    setPolicyPageState({
      ...policyPageState,
      editPolicyModalVisible: true,
      currentRowData: { ...row },
      viewMode: false,
    });
  };

  const handleEditPolicyOK = () => {
    if (viewMode) {
      setPolicyPageState({
        ...policyPageState,
        viewMode: false,
      });
      return;
    }
    setPolicyPageState({
      ...policyPageState,
      editPolicyModalLoading: true,
    });
    formEdit.validateFields().then(() => {
      const fieldValue = formEdit.getFieldsValue();

      const value = {
        ...fieldValue,
        policyNo: currentRowData.policyNo,
      };

      formEdit.resetFields();
      updatePolicy(value)
        .then(res => {
          getPolicyList({ pagination });
        })
        .catch(e => {
          const { httpStatus, fieldName, errorMessage } = e.response.data;
          if (httpStatus === NOT_ACCEPTABLE) {
            formAdd.setFields([{ name: fieldName, errors: [errorMessage] }]);
          }
          setPolicyPageState({
            ...policyPageState,
            editPolicyModalLoading: false,
          });
        });
    });
    /** @TO_DO catch error after validate FE */
    // .catch(() => {});
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getPolicyList({ pagination: newPagination, key });
  };

  const onSearch = (value: string) => {
    setKey(value);
    getPolicyList({ pagination, key: value });
  };

  const handleDeletePolicy = async (policyNo: number) => {
    await deletePolicy(policyNo);
    getPolicyList({ pagination });
  };

  const title = (
    <Space
      direction="horizontal"
      style={{ justifyContent: 'space-between', width: '100%' }}
    >
      <span>
        <Button size="large" type="primary" onClick={handleAddPolicy}>
          Thêm Chính sách
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
    setPolicyPageState({
      ...policyPageState,
      addPolicyModalVisible: false,
      editPolicyModalVisible: false,
      currentRowData: {} as IPolicy,
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
                setPolicyPageState({
                  ...policyPageState,
                  editPolicyModalVisible: true,
                  viewMode: true,
                  currentRowData: record,
                });
              },
            };
          }}
          bordered
          rowKey="policyNo"
          dataSource={policyList}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column
            title="Mã chính sách"
            dataIndex="policyCode"
            key="policyCode"
            align="center"
          />
          <Column
            title="Tên chính sách"
            dataIndex="policyName"
            key="policyName"
            align="center"
          />
          <Column
            title="Thao tác"
            key="action"
            align="center"
            render={(text, row: IPolicy) => (
              <span>
                <EditTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleEditPolicy(row);
                  }}
                />
                <Divider type="vertical" />
                <DeleteTwoTone
                  style={{ fontSize: '150%' }}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    handleDeletePolicy(row.policyNo);
                  }}
                />
              </span>
            )}
          />
        </Table>
      </Card>
      <EditPolicyForm
        clients={clients}
        viewMode={viewMode}
        currentRowData={currentRowData}
        form={formEdit}
        visible={editPolicyModalVisible}
        confirmLoading={editPolicyModalLoading}
        onCancel={handleCancel}
        onOk={handleEditPolicyOK}
      />
      <AddPolicyForm
        clients={clients}
        form={formAdd}
        visible={addPolicyModalVisible}
        confirmLoading={addPolicyModalLoading}
        onCancel={handleCancel}
        onOk={handleAddPolicyOK}
      />
    </div>
  );
};

export default PolicyPage;
